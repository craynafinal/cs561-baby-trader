/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {

    enum GameMode { Goal, Play, Result }

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
        private gameMode: number = GameMode.Goal;
        private babies = null;
        private customers = null;
        private sprite_baby = null;
        private sprite_customer = null;
        private customerDialogLocation = null;
        private text_babyName = null;
        private text_babyAgeAndPrice = null;
        private text_babyAttributes = null;
        private baby_index: number = 0;
        private customer_index: number = 0;
        private static cheatGaugeTick: number = 19;
        
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
                if (currentObject.gameMode === GameMode.Play && (currentObject.cheatGauge_value < BabyTrader.Const.CHEATGAUGE_MAX)) {
                    currentObject.cheatGauge_value = currentObject.cheatGauge_value + BabyTrader.Play.cheatGaugeTick;
                }
            }

            // button setups
            this.button_arrowLeft = displaySpriteButtonOnScreen(this, this.button_arrowLeft, 'template_arrowLeft', 'template_arrowLeft_inv', BabyTrader.Play.displayPreviousBaby, 543, 380);
            this.button_arrowRight = displaySpriteButtonOnScreen(this, this.button_arrowRight, 'template_arrowRight', 'template_arrowRight_inv', BabyTrader.Play.displayNextBaby, 762, 380);
            this.button_business = displaySpriteButtonOnScreen(this, this.button_business, 'template_businessButton', 'template_businessButton_inv', BabyTrader.Play.businessButtonAction, 693, 536);
            this.button_charge = displaySpriteButtonOnScreen(this, this.button_charge, 'template_chargeButton', 'template_chargeButton_inv', chatGaugeFunction, 553, 562);
            this.button_pause = displaySpriteButtonOnScreen(this, this.button_pause, 'template_pauseButton', 'template_pauseButton_inv', BabyTrader.Play.pauseOrResumeGame, 693, 466);
            this.button_talent = displaySpriteButtonOnScreen(this, this.button_talent, 'template_talentButton', 'template_talentButton_inv', BabyTrader.Play.releaseTalentCheat, 487, 562);

            this.setupTimeAndMoney();
            this.displayGoalScreen();
        }

        update() {
            if (this.gameMode === GameMode.Goal || this.gameMode === GameMode.Play) {
                this.updateText();
            }

            if (this.gameMode === GameMode.Goal && this.isPreparationDone) {
                this.isPreparationDone = false;
                this.startGame();
            }

            if (this.gameMode === GameMode.Play && (this.gameTime === 0 || this.money_current >= this.money_goal)) {
                this.game.time.events.stop();
                BabyTrader.Play.removePlayScreen(this);
                BabyTrader.Play.displayResultScreen(this);
            }

            if (this.gameMode === GameMode.Play && this.cheatGauge_sprite) {
                this.cheatGauge_sprite.destroy();
                this.cheatGauge_sprite = displaySolidRectangular(this.game, this.cheatGauge_sprite, BabyTrader.Const.GREENCOLOR, 1, this.cheatGauge_value, 18, 245, 553);
            }

            if (this.gameMode === GameMode.Result && this.isPreparationDone) {
                this.isPreparationDone = false;
                this.setupTimeAndMoney();
                this.displayGoalScreen();
            }
        }
        
        static businessButtonAction(currentObject) {
            if (currentObject.gameMode === GameMode.Play) {
                var currentCustomer = currentObject.customers[currentObject.customer_index];
                var currentBaby = currentObject.babies[currentObject.baby_index];

                if (currentCustomer.checkElementsAvailability(currentBaby.getAttributes())) {
                    currentObject.money_current += currentBaby.getPrice();
                    BabyTrader.Play.printDialog(currentObject, currentCustomer.accept());

                    // disable buttons for a while
                    BabyTrader.Play.setButtonInputs(currentObject, false);
                    if (currentObject.customer_index <= currentObject.customers.length - 2) {

                        currentObject.game.time.events.add(Phaser.Timer.SECOND * 4, function () {
                            // more customers available
                            BabyTrader.Play.displayCustomers(currentObject, currentObject.customer_index++);
                            currentCustomer = currentObject.customers[currentObject.customer_index];
                            
                            BabyTrader.Play.printDialog(currentObject, currentCustomer.greet());


                            // remove current baby and reload
                            currentObject.babies.splice(currentObject.baby_index, 1);
                            BabyTrader.Play.displayBabies(currentObject, 0);
                            BabyTrader.Play.setButtonInputs(currentObject, true);
                        }, this);

                        // print new dialog
                    } else {
                        // no more customers left, stop the game level
                        currentObject.game.time.events.stop();
                        BabyTrader.Play.removePlayScreen(currentObject);
                        BabyTrader.Play.displayResultScreen(currentObject);
                    }

                } else {
                    BabyTrader.Play.printDialog(currentObject, currentCustomer.reject());
                }
            }
        }

        static displayNextBaby(currentObject) {
            if (currentObject.gameMode === GameMode.Play) {

                // mod operator not working?
                if (currentObject.baby_index < currentObject.babies.length - 2) {
                    currentObject.baby_index++;
                } else {
                    currentObject.baby_index = 0;
                }

                BabyTrader.Play.displayBabies(currentObject, currentObject.baby_index);
            }
        }

        static displayPreviousBaby(currentObject) {
            if (currentObject.gameMode === GameMode.Play) {

                // mod operator not working?
                if (currentObject.baby_index > 0) {
                    currentObject.baby_index--;
                } else {
                    currentObject.baby_index = currentObject.babies.length - 1;
                }

                BabyTrader.Play.displayBabies(currentObject, currentObject.baby_index);
            }
        }

        static printDialog(currentObject, dialogs) {
            Dialog.startDialog(currentObject.game, currentObject.customerDialogLocation, dialogs);
        }

        initializeCustomers() {
            this.customers = new Array();
            for (var i = 0; i< (this.gameLevel + 10); i++) {
               this.customers.push(new BabyTrader.Customer());
            }

            this.customerDialogLocation = displayTextOnScreen(this.game, this.customerDialogLocation, '', { font: "900 18px Work Sans", fill: BabyTrader.Const.TEXTWHITEGRAYCOLOR_STRING, align: "left", wordWrap: true, wordWrapWidth: 160 }, 27, 363, 0, 0);
            this.customerDialogLocation.lineSpacing = -5;
            this.customer_index = 0;
        }

        static displayCustomers(currentObject, index) {
            if (currentObject.sprite_customer) {
                currentObject.sprite_customer.destroy();
            }
            currentObject.sprite_customer = displaySpriteOnScreen(currentObject.game, currentObject.sprite_customer, currentObject.customers[index].getSprite(), 109, 201);
        }

        initializeBabies() {
            this.babies = new Array();
            for (var i = 0; i < (this.gameLevel + 5); i++) {
                this.babies.push(new BabyTrader.Baby());
            }
            this.baby_index = 0;
        }

        static displayBabies(currentObject, index) {
            if (currentObject.sprite_baby) {
                currentObject.sprite_baby.destroy();
            }
            currentObject.sprite_baby = displaySpriteOnScreen(currentObject.game, currentObject.sprite_baby, currentObject.babies[index].getSprite(), 375, 217);

            if (currentObject.text_babyName) {
                currentObject.text_babyName.destroy();
            }
            currentObject.text_babyName = displayTextOnScreen(currentObject.game, currentObject.text_babyName, currentObject.babies[index].getName().toUpperCase(), { font: "900 26px Work Sans", fill: BabyTrader.Const.TEXTWHITEGRAYCOLOR_STRING, align: "left" }, 520, 40, 0, 0);

            if (currentObject.text_babyAgeAndPrice) {
                currentObject.text_babyAgeAndPrice.destroy();
            }
            var months = currentObject.babies[index].getMonth();
            var monthString = months > 1 ? months + " Months" : months + " Month";
            currentObject.text_babyAgeAndPrice = displayTextOnScreen(currentObject.game, currentObject.text_babyAgeAndPrice, (monthString + "\nOnly $" + currentObject.babies[index].getPrice()).toUpperCase(), { font: "900 18px Work Sans", fill: BabyTrader.Const.TEXTWHITEGRAYCOLOR_STRING, align: "left" }, 520, 66, 0, 0);
            currentObject.text_babyAgeAndPrice.lineSpacing = -5;
            if (currentObject.text_babyAttributes) {
                currentObject.text_babyAttributes.destroy();
            }

            var attributeStrings = "This baby's attributes:\n";
            var attributeArray = currentObject.babies[index].getAttributes();
            
            for (var i = 0; i < attributeArray.length; i++) {
                // somehow html symbol code does not work
                attributeStrings = attributeStrings + "★ " + attributeArray[i].getName() + "\n";
            }
            
            currentObject.text_babyAttributes = displayTextOnScreen(currentObject.game, currentObject.text_babyAttributes, attributeStrings.toUpperCase(), { font: "900 16px Work Sans", fill: BabyTrader.Const.TEXTWHITEGRAYCOLOR_STRING, align: "left" }, 520, 125, 0, 0);
        }

        static releaseTalentCheat(currentObject) {
            if (currentObject.gameMode === GameMode.Play && (currentObject.cheatGauge_value >= BabyTrader.Const.CHEATGAUGE_MAX)) {
                currentObject.cheatGauge_value = 0;

                var currentCustomer = currentObject.customers[currentObject.customer_index];
                //var currentCustomerAttributes = new Array();
                var babyAttributes = currentObject.babies[currentObject.baby_index].getAttributes();
                var check = false;
                var index = 0;

                if (!currentCustomer.checkElementsAvailability(babyAttributes)) {
                    while (!check && (index <= babyAttributes.length - 1)) {

                        // find the element that is not needed, so it can be replaced
                        if (!currentCustomer.checkElementAvailability(babyAttributes[index])) {

                            // assign a new attribute if there is a missing attribute
                            var missingAttribute = currentCustomer.getMissingAttribute(babyAttributes);
                            if (missingAttribute) {
                                babyAttributes[index] = missingAttribute;
                                // update the display
                                BabyTrader.Play.displayBabies(currentObject, currentObject.baby_index);
                            }
                            check = true;

                        }
                        index++;
                    }
                }
            }
        }

        resetCheatGauge() {
            this.cheatGauge_value = 0;
        }

        increaseCheatGauge() {
            if (this.cheatGauge_value < BabyTrader.Const.CHEATGAUGE_MAX) {
                this.cheatGauge_value = this.cheatGauge_value + BabyTrader.Play.cheatGaugeTick;
            }
        }

        static removePlayScreen(currentObject) {
            currentObject.text_money.destroy();
            currentObject.text_time.destroy();
        }
        
        static displayResultScreen(currentObject) {
            var panelTitleSpriteName = 'resultScreen_titleSuccess';
            var goButtonSpriteName = 'resultScreen_nextLevelButton';
            var goButtonInvSpriteName = 'resultScreen_nextLevelButton_inv';

            if (currentObject.money_current < currentObject.money_goal) {
                panelTitleSpriteName = 'resultScreen_titleFail';
                goButtonSpriteName = 'resultScreen_tryAgainButton';
                goButtonInvSpriteName = 'resultScreen_tryAgainButton_inv';
            }

            currentObject.gameMode = GameMode.Result;
            currentObject.overlay = displaySolidBackground(currentObject.game, currentObject.overlay, BabyTrader.Const.GOAL_BACKGROUND, 1);
            currentObject.sprite_panel = displaySpriteOnScreen(currentObject.game, currentObject.sprite_panel, 'resultScreen_panel', 401, 252);

            currentObject.sprite_panelTitle = displaySpriteOnScreen(currentObject.game, currentObject.sprite_panelTitle, panelTitleSpriteName, 393, 144);

            currentObject.button_start = displaySpriteButtonOnScreen(currentObject, currentObject.button_start, goButtonSpriteName, goButtonInvSpriteName, BabyTrader.Play.removePanelDisplayScreen, 526, 487);
            currentObject.button_backToTitle = displaySpriteButtonOnScreen(currentObject, currentObject.button_backToTitle, 'resultScreen_backToTitleButton', 'resultScreen_backToTitleButton_inv', BabyTrader.Play.goBackToTitle, 292, 487);

            currentObject.text_time = displayTextOnScreen(currentObject.game, currentObject.text_time, BabyTrader.Play.getTimeInFormat(currentObject.gameTime_initial - currentObject.gameTime), BabyTrader.Play.greenFontStyle, 564, 215, 1, 0);
            currentObject.text_money = displayTextOnScreen(currentObject.game, currentObject.text_money, '$' + String(currentObject.money_current), BabyTrader.Play.greenFontStyle, 564, 281, 1, 0);
            currentObject.text_goal = displayTextOnScreen(currentObject.game, currentObject.text_goal, '$' + String(currentObject.money_goal), BabyTrader.Play.greenFontStyle, 564, 347, 1, 0);

            // reduce game level
            if (currentObject.money_current < currentObject.money_goal) {
                currentObject.gameLevel--;
            }
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
            this.money_current = 0;
            this.money_goal = (this.gameLevel * 20) + 100;
            this.gameTime = 60 + (this.gameLevel * 10);
            this.gameTime_initial = this.gameTime;
            this.gameLevel++;
        }
        
        static pauseOrResumeGame(currentObject) {
            if (currentObject.gameMode === GameMode.Play) {
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
        }

        static setButtonInputs(currentObject, trueOrFalse: boolean) {
            // able to click it or not
            currentObject.button_arrowLeft.inputEnabled = trueOrFalse;
            currentObject.button_arrowRight.inputEnabled = trueOrFalse;
            currentObject.button_business.inputEnabled = trueOrFalse;
            currentObject.button_charge.inputEnabled = trueOrFalse;
            currentObject.button_talent.inputEnabled = trueOrFalse;

            // handcursor mouse pointer
            currentObject.button_arrowLeft.useHandCursor = trueOrFalse;
            currentObject.button_arrowRight.useHandCursor = trueOrFalse;
            currentObject.button_business.useHandCursor = trueOrFalse;
            currentObject.button_charge.useHandCursor = trueOrFalse;
            currentObject.button_talent.useHandCursor = trueOrFalse;
        }

        startGame() {
            this.gameMode = GameMode.Play;
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
            BabyTrader.Play.displayBabies(this, 0);
            BabyTrader.Play.displayCustomers(this, 0);
            BabyTrader.Play.printDialog(this, this.customers[0].greet());
            BabyTrader.Play.setButtonInputs(this, true);
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
            this.gameMode = GameMode.Goal;
            this.overlay = displaySolidBackground(this.game, this.overlay, BabyTrader.Const.GOAL_BACKGROUND, 1);
            this.sprite_panel = displaySpriteOnScreen(this.game, this.sprite_panel, 'goalScreen_panel', 401, 250);
            
            this.button_start = displaySpriteButtonOnScreen(this, this.button_start, 'goalScreen_startButton', 'goalScreen_startButton_inv', BabyTrader.Play.removePanelDisplayScreen, 526, 452);
            this.button_backToTitle = displaySpriteButtonOnScreen(this, this.button_backToTitle, 'goalScreen_backToTitleButton', 'goalScreen_backToTitleButton_inv', BabyTrader.Play.goBackToTitle, 263, 452);

            this.text_money = displayTextOnScreen(this.game, this.text_money, '', BabyTrader.Play.greenFontStyle, 564, 312, 1, 0);
            this.text_time = displayTextOnScreen(this.game, this.text_time, '', BabyTrader.Play.greenFontStyle, 564, 246, 1, 0);
        }

        updateText() {
            if (this.text_money) {
                var money = (this.gameMode == GameMode.Play) ? String(this.money_goal - this.money_current) : this.money_goal;
                this.text_money.setText("$" + money);
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