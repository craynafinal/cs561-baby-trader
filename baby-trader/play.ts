/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Play extends Phaser.State {
        constructor() {
            super();
        }

        private key_pause = null;
        private overlay = null;
        private pauseState: boolean = false;
        private sprite_template = null;
        private sprite_panel = null;
        private sprite_panelTitle = null;
        private button_arrowLeft = null;
        private button_arrowRight = null;
        private button_business = null;
        private button_charge = null;
        private button_pause = null;
        private button_talent = null;
        private button_start = null;
        private button_backToTitle = null;
        private gameLevel: number = 0;
        private gameTime: number = 0;
        private gameTime_initial: number = 0;
        private money_current: number = 0;
        private money_goal: number = 0;
        private text_money = null;
        private text_time = null;
        private text_goal = null;
        private static greenFontStyle = { font: "900 26px Sarpanch", fill: BabyTrader.Const.GREENCOLOR_STRING, align: "right" };
        private isPreparationDone: boolean = false;
        private cheatGauge_sprite = null;
        private cheatGauge_value: number = 0;
        private gameMode: number = BabyTrader.Const.GAMEMODE_GOAL;
        private babies = null;
        private customers = null;
        private sprite_baby = null;
        private sprite_customer = null;
        private customerDialogLocation = null;
        private text_babyName = null;
        private text_babyAgeAndPrice = null;
        private text_babyAttributes = null;
        
        preload() {
        }

        create() {
            // setup bgm
            playBackgroundSound(this.game, 'bgm_play');

            // setup keys
            setupKeyboardHotkeys(this.game, this.key_pause, Phaser.Keyboard.ESC, BabyTrader.Play.pauseOrResumeGame, this);

            // setup background color
            this.game.stage.backgroundColor = Const.TEMPLATE_BACKGROUND;

            // template
            this.sprite_template = displaySpriteOnScreen(this.game, this.sprite_template, 'template_template', 0, 0, 0, 0);

            var chatGaugeFunction = function (currentObject) {
                if (currentObject.cheatGauge_value < BabyTrader.Const.CHEATGAUGE_MAX) {
                    currentObject.cheatGauge_value = currentObject.cheatGauge_value + 5;
                }
            }

            // button setups
            this.button_arrowLeft = displaySpriteButtonOnScreen(this, this.button_arrowLeft, 'template_arrowLeft', 'template_arrowLeft_inv', null, 543, 380);
            this.button_arrowRight = displaySpriteButtonOnScreen(this, this.button_arrowRight, 'template_arrowRight', 'template_arrowRight_inv', null, 762, 380);
            this.button_business = displaySpriteButtonOnScreen(this, this.button_business, 'template_businessButton', 'template_businessButton_inv', null, 693, 536);
            this.button_charge = displaySpriteButtonOnScreen(this, this.button_charge, 'template_chargeButton', 'template_chargeButton_inv', chatGaugeFunction, 553, 562);
            this.button_pause = displaySpriteButtonOnScreen(this, this.button_pause, 'template_pauseButton', 'template_pauseButton_inv', BabyTrader.Play.pauseOrResumeGame, 693, 466);
            this.button_talent = displaySpriteButtonOnScreen(this, this.button_talent, 'template_talentButton', 'template_talentButton_inv', BabyTrader.Play.releaseTalentCheat, 487, 562);

            this.setupTimeAndMoney();
            this.displayGoalScreen();
        }

        update() {
            if (this.gameMode == BabyTrader.Const.GAMEMODE_GOAL || this.gameMode == BabyTrader.Const.GAMEMODE_PLAY) {
                this.updateText();
            }

            if (this.gameMode == BabyTrader.Const.GAMEMODE_GOAL && this.isPreparationDone) {
                this.isPreparationDone = false;
                this.startGame();
            }

            if (this.gameMode == BabyTrader.Const.GAMEMODE_PLAY && (this.gameTime == 0 || this.money_current >= this.money_goal)) {
                this.game.time.events.stop();
                this.removePlayScreen();
                this.displayResultScreen();
            }

            if (this.gameMode == BabyTrader.Const.GAMEMODE_PLAY && this.cheatGauge_value >= BabyTrader.Const.CHEATGAUGE_MAX) {
                //BabyTrader.Const.YELLOWCOLOR
                //this.cheatGauge_sprite.graphicsData[0].fillColor = 0xffff00;

                //console.log(this.cheatGauge_sprite.graphicsData[0]);

                //this.cheatGauge_sprite.destroy();
                //this.cheatGauge_sprite = displaySolidRectangular(this.game, this.cheatGauge_sprite, BabyTrader.Const.YELLOWCOLOR, 1, this.cheatGauge_value, 18, 245, 553);
                //console.log();
                //this.cheatGauge_sprite.graphicsData[0].tint = BabyTrader.Const.YELLOWCOLOR;
            }

            if (this.gameMode == BabyTrader.Const.GAMEMODE_PLAY && this.cheatGauge_sprite) {
                this.cheatGauge_sprite.destroy();
                this.cheatGauge_sprite = displaySolidRectangular(this.game, this.cheatGauge_sprite, BabyTrader.Const.GREENCOLOR, 1, this.cheatGauge_value, 18, 245, 553);
            }

            if (this.gameMode == BabyTrader.Const.GAMEMODE_RESULT && this.isPreparationDone) {
                this.isPreparationDone = false;
                this.setupTimeAndMoney();
                this.displayGoalScreen();
            }
        }
        
        printDialog(dialogs) {
            Dialog.startDialog(this.game, this.customerDialogLocation, dialogs);
        }

        initializeCustomers() {
            this.customers = new Array();
            for (var i = 0; i< (this.gameLevel + 2); i++) {
               this.customers.push(new BabyTrader.Customer());
            }

            this.customerDialogLocation = displayTextOnScreen(this.game, this.customerDialogLocation, '', { font: "900 18px Work Sans", fill: BabyTrader.Const.TEXTWHITEGRAYCOLOR_STRING, align: "left", wordWrap: true, wordWrapWidth: 160 }, 27, 363, 0, 0);
            this.customerDialogLocation.lineSpacing = -5;
        }

        displayCustomers(index) {
            this.sprite_customer = displaySpriteOnScreen(this.game, this.sprite_customer, this.customers[index].getSprite(), 109, 201);
        }

        initializeBabies() {
            this.babies = new Array();
            for (var i = 0; i < (this.gameLevel + 5); i++) {
                this.babies.push(new BabyTrader.Baby());
            }
        }

        displayBabies(index) {
            if (this.sprite_baby) {
                this.sprite_baby.destroy();
            }
            this.sprite_baby = displaySpriteOnScreen(this.game, this.sprite_baby, this.babies[index].getSprite(), 375, 217);

            if (this.text_babyName) {
                this.text_babyName.destroy();
            }
            this.text_babyName = displayTextOnScreen(this.game, this.text_babyName, this.babies[index].getName().toUpperCase(), { font: "900 26px Work Sans", fill: BabyTrader.Const.TEXTWHITEGRAYCOLOR_STRING, align: "left" }, 520, 40, 0, 0);

            if (this.text_babyAgeAndPrice) {
                this.text_babyAgeAndPrice.destroy();
            }
            var months = this.babies[index].getMonth();
            var monthString = months > 1 ? months + " Months" : months + " Month";
            this.text_babyAgeAndPrice = displayTextOnScreen(this.game, this.text_babyAgeAndPrice, (monthString + "\nOnly $" + this.babies[index].getPrice()).toUpperCase(), { font: "900 18px Work Sans", fill: BabyTrader.Const.TEXTWHITEGRAYCOLOR_STRING, align: "left" }, 520, 66, 0, 0);
            this.text_babyAgeAndPrice.lineSpacing = -5;
            if (this.text_babyAttributes) {
                this.text_babyAttributes.destroy();
            }

            var attributeStrings = "This baby's attributes:\n";
            var attributeArray = this.babies[index].getAttributes();
            
            for (var i = 0; i < attributeArray.length; i++) {
                attributeStrings = attributeStrings + "● " + attributeArray[i].getName() + "\n";
            }
            
            this.text_babyAttributes = displayTextOnScreen(this.game, this.text_babyAttributes, attributeStrings.toUpperCase(), { font: "900 16px Work Sans", fill: BabyTrader.Const.TEXTWHITEGRAYCOLOR_STRING, align: "left" }, 520, 125, 0, 0);
        }

        static releaseTalentCheat(currentObject) {
            if (currentObject.cheatGauge_value >= BabyTrader.Const.CHEATGAUGE_MAX) {
                currentObject.cheatGauge_value = 0;
            }
        }

        resetCheatGauge() {
            this.cheatGauge_value = 5;
        }

        increaseCheatGauge() {
            if (this.cheatGauge_value < BabyTrader.Const.CHEATGAUGE_MAX) {
                this.cheatGauge_value = this.cheatGauge_value + 5;
            }
        }

        reduceGameLevel() {
            if (this.money_current < this.money_goal) {
                this.gameLevel--;
            }
        }

        removePlayScreen() {
            this.text_money.destroy();
            this.text_time.destroy();
        }
        
        displayResultScreen() {
            var panelTitleSpriteName = 'resultScreen_titleSuccess';
            var goButtonSpriteName = 'resultScreen_nextLevelButton';
            var goButtonInvSpriteName = 'resultScreen_nextLevelButton_inv';

            if (this.money_current < this.money_goal) {
                panelTitleSpriteName = 'resultScreen_titleFail';
                goButtonSpriteName = 'resultScreen_tryAgainButton';
                goButtonInvSpriteName = 'resultScreen_tryAgainButton_inv';
            }

            this.gameMode = BabyTrader.Const.GAMEMODE_RESULT;
            this.overlay = displaySolidBackground(this.game, this.overlay, BabyTrader.Const.GOAL_BACKGROUND, 1);
            this.sprite_panel = displaySpriteOnScreen(this.game, this.sprite_panel, 'resultScreen_panel', 401, 252);

            this.sprite_panelTitle = displaySpriteOnScreen(this.game, this.sprite_panelTitle, panelTitleSpriteName, 393, 144);

            this.button_start = displaySpriteButtonOnScreen(this, this.button_start, goButtonSpriteName, goButtonInvSpriteName, BabyTrader.Play.removePanelDisplayScreen, 526, 487);
            this.button_backToTitle = displaySpriteButtonOnScreen(this, this.button_backToTitle, 'resultScreen_backToTitleButton', 'resultScreen_backToTitleButton_inv', BabyTrader.Play.goBackToTitle, 292, 487);

            this.text_time = displayTextOnScreen(this.game, this.text_time, BabyTrader.Play.getTimeInFormat(this.gameTime_initial - this.gameTime), BabyTrader.Play.greenFontStyle, 564, 215, 1, 0);
            this.text_money = displayTextOnScreen(this.game, this.text_money, '$' + String(this.money_current), BabyTrader.Play.greenFontStyle, 564, 281, 1, 0);
            this.text_goal = displayTextOnScreen(this.game, this.text_goal, '$' + String(this.money_goal), BabyTrader.Play.greenFontStyle, 564, 347, 1, 0);

            this.reduceGameLevel();
        }

        static removePanelDisplayScreen(currentObject) {
            if (currentObject.overlay) {
                currentObject.overlay.destroy();
            }
            if (currentObject.sprite_panel) {
                currentObject.sprite_panel.destroy();
            }
            if (currentObject.button_start) {
                currentObject.button_start.destroy();
            }
            if (currentObject.button_backToTitle) {
                currentObject.button_backToTitle.destroy();
            }
            if (currentObject.text_money) {
                currentObject.text_money.destroy();
            }
            if (currentObject.text_time) {
                currentObject.text_time.destroy();
            }
            if (currentObject.text_goal) {
                currentObject.text_goal.destroy();
            }
            if (currentObject.sprite_panelTitle) {
                currentObject.sprite_panelTitle.destroy();
            }
            if (currentObject.cheatGauge_sprite) {
                currentObject.cheatGauge_sprite.destroy();
            }
            if (currentObject.sprite_customer) {
                currentObject.sprite_customer.destroy();
            }
            if (currentObject.sprite_baby) {
                currentObject.sprite_baby.destroy();
            }
            if (currentObject.customerDialogLocation) {
                currentObject.customerDialogLocation.destroy();
            }
            currentObject.isPreparationDone = true;
        }

        setupTimeAndMoney() {
            this.money_goal = (this.gameLevel * 20) + 100;
            this.gameTime = 10 + (this.gameLevel * 10);
            this.gameTime_initial = this.gameTime;
            this.gameLevel++;
        }
        
        static pauseOrResumeGame(currentObject) {
            if (!currentObject.pauseState) {
                currentObject.pauseState = true;
                currentObject.game.time.events.pause();
                BabyTrader.Play.setButtonInputs(currentObject, false);
            } else {
                currentObject.pauseState = false;
                currentObject.game.time.events.resume();
                BabyTrader.Play.setButtonInputs(currentObject, true);
            }
        }

        static setButtonInputs(currentObject, trueOrFalse: boolean) {
            currentObject.button_arrowLeft.inputEnabled = trueOrFalse;
            currentObject.button_arrowRight.inputEnabled = trueOrFalse;
            currentObject.button_business.inputEnabled = trueOrFalse;
            currentObject.button_charge.inputEnabled = trueOrFalse;
            currentObject.button_talent.inputEnabled = trueOrFalse;
        }

        startGame() {
            this.gameMode = BabyTrader.Const.GAMEMODE_PLAY;
            this.text_money = displayTextOnScreen(this.game, this.text_money, '', BabyTrader.Play.greenFontStyle, 461, 471, 1, 0);
            this.text_time = displayTextOnScreen(this.game, this.text_time, '', BabyTrader.Play.greenFontStyle, 572, 471, 1, 0);

            this.game.time.events.repeat(Phaser.Timer.SECOND * 1, this.gameTime, this.decrementSecond, this);

            this.resetCheatGauge();
            this.game.time.events.start();
            this.game.time.events.loop(Phaser.Timer.SECOND * 1, this.increaseCheatGauge, this);

            this.cheatGauge_sprite = displaySolidRectangular(this.game, this.cheatGauge_sprite, BabyTrader.Const.GREENCOLOR, 1, 190, 18, 245, 553);

            // customers and babies setting
            this.initializeBabies();
            this.initializeCustomers();
            this.displayBabies(0);
            this.displayCustomers(0);
            this.printDialog(this.customers[0].greet());
        }

        decrementSecond() {
            if (this.gameTime > 0) {
                this.gameTime--;
            }
        }

        static goBackToTitle(currentObject) {
            currentObject.gameLevel = 0;
            currentObject.game.state.start('title');
        }

        displayGoalScreen() {
            this.gameMode = BabyTrader.Const.GAMEMODE_GOAL;
            this.overlay = displaySolidBackground(this.game, this.overlay, BabyTrader.Const.GOAL_BACKGROUND, 1);
            this.sprite_panel = displaySpriteOnScreen(this.game, this.sprite_panel, 'goalScreen_panel', 401, 250);
            
            this.button_start = displaySpriteButtonOnScreen(this, this.button_start, 'goalScreen_startButton', 'goalScreen_startButton_inv', BabyTrader.Play.removePanelDisplayScreen, 526, 452);
            this.button_backToTitle = displaySpriteButtonOnScreen(this, this.button_backToTitle, 'goalScreen_backToTitleButton', 'goalScreen_backToTitleButton_inv', BabyTrader.Play.goBackToTitle, 263, 452);

            this.text_money = displayTextOnScreen(this.game, this.text_money, '', BabyTrader.Play.greenFontStyle, 564, 246, 1, 0);
            this.text_time = displayTextOnScreen(this.game, this.text_time, '', BabyTrader.Play.greenFontStyle, 564, 312, 1, 0);
        }

        updateText() {
            if (this.text_money) {
                this.text_money.setText("$" + String(this.money_goal - this.money_current));
            }

            if (this.text_time) {
                this.text_time.setText(BabyTrader.Play.getTimeInFormat(this.gameTime));
            }
        }

        static getTimeInFormat(timeInSecond) {
            var hour = Math.floor(timeInSecond / 60);
            var minute = timeInSecond;
            var format = "";

            if (hour > 0) {
                minute = timeInSecond - (hour * 60);
            }

            if (minute <= 9) {
                format = "0";
            }

            return String(hour) + ":" + format + minute;
        }
    }
} 