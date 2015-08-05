/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BabyTrader;
(function (BabyTrader) {
    var GameMode;
    (function (GameMode) {
        GameMode[GameMode["Goal"] = 0] = "Goal";
        GameMode[GameMode["Play"] = 1] = "Play";
        GameMode[GameMode["Result"] = 2] = "Result";
    })(GameMode || (GameMode = {}));
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
            this.key_pause = null;
            this.overlay = null;
            this.pauseState = false;
            this.sprite_template = null;
            this.sprite_panel = null;
            this.sprite_panelTitle = null;
            this.button_arrowLeft = null;
            this.button_arrowRight = null;
            this.button_business = null;
            this.button_charge = null;
            this.button_pause = null;
            this.button_talent = null;
            this.button_start = null;
            this.button_backToTitle = null;
            this.gameLevel = 0;
            this.gameTime = 0;
            this.gameTime_initial = 0;
            this.money_current = 0;
            this.money_goal = 0;
            this.text_money = null;
            this.text_time = null;
            this.text_goal = null;
            this.isPreparationDone = false;
            this.cheatGauge_sprite = null;
            this.cheatGauge_value = 0;
            this.gameMode = GameMode.Goal;
            this.babies = null;
            this.customers = null;
            this.sprite_baby = null;
            this.sprite_customer = null;
            this.customerDialogLocation = null;
            this.text_babyName = null;
            this.text_babyAgeAndPrice = null;
            this.text_babyAttributes = null;
            this.baby_index = 0;
            this.customer_index = 0;
        }
        Play.prototype.preload = function () {
        };
        Play.prototype.create = function () {
            // setup bgm
            playBackgroundSound(this.game, 'bgm_play');
            // setup keys
            setupKeyboardHotkeys(this.game, this.key_pause, Phaser.Keyboard.ESC, BabyTrader.Play.pauseOrResumeGame, this);
            // setup background color
            this.game.stage.backgroundColor = BabyTrader.Const.TEMPLATE_BACKGROUND;
            // template
            this.sprite_template = displaySpriteOnScreen(this.game, this.sprite_template, 'template_template', 0, 0, 0, 0);
            var chatGaugeFunction = function (currentObject) {
                if (currentObject.gameMode === GameMode.Play && (currentObject.cheatGauge_value < BabyTrader.Const.CHEATGAUGE_MAX)) {
                    currentObject.cheatGauge_value = currentObject.cheatGauge_value + 19;
                }
            };
            // button setups
            this.button_arrowLeft = displaySpriteButtonOnScreen(this, this.button_arrowLeft, 'template_arrowLeft', 'template_arrowLeft_inv', BabyTrader.Play.displayPreviousBaby, 543, 380);
            this.button_arrowRight = displaySpriteButtonOnScreen(this, this.button_arrowRight, 'template_arrowRight', 'template_arrowRight_inv', BabyTrader.Play.displayNextBaby, 762, 380);
            this.button_business = displaySpriteButtonOnScreen(this, this.button_business, 'template_businessButton', 'template_businessButton_inv', BabyTrader.Play.businessButtonAction, 693, 536);
            this.button_charge = displaySpriteButtonOnScreen(this, this.button_charge, 'template_chargeButton', 'template_chargeButton_inv', chatGaugeFunction, 553, 562);
            this.button_pause = displaySpriteButtonOnScreen(this, this.button_pause, 'template_pauseButton', 'template_pauseButton_inv', BabyTrader.Play.pauseOrResumeGame, 693, 466);
            this.button_talent = displaySpriteButtonOnScreen(this, this.button_talent, 'template_talentButton', 'template_talentButton_inv', BabyTrader.Play.releaseTalentCheat, 487, 562);
            this.setupTimeAndMoney();
            this.displayGoalScreen();
        };
        Play.prototype.update = function () {
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
            if (this.gameMode === GameMode.Play && this.cheatGauge_value >= BabyTrader.Const.CHEATGAUGE_MAX) {
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
        };
        Play.businessButtonAction = function (currentObject) {
            if (currentObject.gameMode === GameMode.Play) {
                var currentCustomer = currentObject.customers[currentObject.customer_index];
                var currentBaby = currentObject.babies[currentObject.baby_index];
                if (currentCustomer.checkElementsAvailability(currentBaby.getAttributes())) {
                    currentObject.money_current += currentBaby.getPrice();
                    BabyTrader.Play.printDialog(currentObject, currentCustomer.accept());
                    if (currentObject.customer_index < currentObject.customers.length - 2) {
                        // more customers available
                        //BabyTrader.Play.displayCustomers(currentObject, currentObject.customer_index++);
                        // remove current baby and reload
                        currentObject.babies.splice(currentObject.baby_index, 1);
                        BabyTrader.Play.displayBabies(currentObject, 0);
                    }
                    else {
                        // no more customers left, stop the game level
                        currentObject.game.time.events.stop();
                        BabyTrader.Play.removePlayScreen(currentObject);
                        BabyTrader.Play.displayResultScreen(currentObject);
                    }
                }
                else {
                    BabyTrader.Play.printDialog(currentObject, currentCustomer.reject());
                }
            }
        };
        Play.displayNextBaby = function (currentObject) {
            if (currentObject.gameMode === GameMode.Play) {
                // mod operator not working?
                if (currentObject.baby_index < currentObject.babies.length - 2) {
                    currentObject.baby_index++;
                }
                else {
                    currentObject.baby_index = 0;
                }
                BabyTrader.Play.displayBabies(currentObject, currentObject.baby_index);
            }
        };
        Play.displayPreviousBaby = function (currentObject) {
            if (currentObject.gameMode === GameMode.Play) {
                // mod operator not working?
                if (currentObject.baby_index > 0) {
                    currentObject.baby_index--;
                }
                else {
                    currentObject.baby_index = currentObject.babies.length - 1;
                }
                BabyTrader.Play.displayBabies(currentObject, currentObject.baby_index);
            }
        };
        Play.printDialog = function (currentObject, dialogs) {
            BabyTrader.Dialog.startDialog(currentObject.game, currentObject.customerDialogLocation, dialogs);
        };
        Play.prototype.initializeCustomers = function () {
            this.customers = new Array();
            for (var i = 0; i < (this.gameLevel + 2); i++) {
                this.customers.push(new BabyTrader.Customer());
            }
            this.customerDialogLocation = displayTextOnScreen(this.game, this.customerDialogLocation, '', { font: "900 18px Work Sans", fill: BabyTrader.Const.TEXTWHITEGRAYCOLOR_STRING, align: "left", wordWrap: true, wordWrapWidth: 160 }, 27, 363, 0, 0);
            this.customerDialogLocation.lineSpacing = -5;
            this.customer_index = 0;
        };
        Play.displayCustomers = function (currentObject, index) {
            currentObject.sprite_customer = displaySpriteOnScreen(currentObject.game, currentObject.sprite_customer, currentObject.customers[index].getSprite(), 109, 201);
        };
        Play.prototype.initializeBabies = function () {
            this.babies = new Array();
            for (var i = 0; i < (this.gameLevel + 5); i++) {
                this.babies.push(new BabyTrader.Baby());
            }
            this.baby_index = 0;
        };
        Play.displayBabies = function (currentObject, index) {
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
        };
        Play.releaseTalentCheat = function (currentObject) {
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
        };
        Play.prototype.resetCheatGauge = function () {
            this.cheatGauge_value = 0;
        };
        Play.prototype.increaseCheatGauge = function () {
            if (this.cheatGauge_value < BabyTrader.Const.CHEATGAUGE_MAX) {
                this.cheatGauge_value = this.cheatGauge_value + 19;
            }
        };
        Play.removePlayScreen = function (currentObject) {
            currentObject.text_money.destroy();
            currentObject.text_time.destroy();
        };
        Play.displayResultScreen = function (currentObject) {
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
        };
        Play.removePanelDisplayScreen = function (currentObject) {
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
        };
        Play.prototype.setupTimeAndMoney = function () {
            this.money_goal = (this.gameLevel * 20) + 100;
            this.gameTime = 60 + (this.gameLevel * 10);
            this.gameTime_initial = this.gameTime;
            this.gameLevel++;
        };
        Play.pauseOrResumeGame = function (currentObject) {
            if (currentObject.gameMode === GameMode.Play) {
                if (!currentObject.pauseState) {
                    currentObject.pauseState = true;
                    currentObject.game.time.events.pause();
                    BabyTrader.Play.setButtonInputs(currentObject, false);
                }
                else {
                    currentObject.pauseState = false;
                    currentObject.game.time.events.resume();
                    BabyTrader.Play.setButtonInputs(currentObject, true);
                }
            }
        };
        Play.setButtonInputs = function (currentObject, trueOrFalse) {
            currentObject.button_arrowLeft.inputEnabled = trueOrFalse;
            currentObject.button_arrowRight.inputEnabled = trueOrFalse;
            currentObject.button_business.inputEnabled = trueOrFalse;
            currentObject.button_charge.inputEnabled = trueOrFalse;
            currentObject.button_talent.inputEnabled = trueOrFalse;
        };
        Play.prototype.startGame = function () {
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
        };
        Play.prototype.decrementSecond = function () {
            if (this.gameTime > 0) {
                this.gameTime--;
            }
        };
        Play.goBackToTitle = function (currentObject) {
            currentObject.gameLevel = 0;
            currentObject.game.state.start('title');
        };
        Play.prototype.displayGoalScreen = function () {
            this.gameMode = GameMode.Goal;
            this.overlay = displaySolidBackground(this.game, this.overlay, BabyTrader.Const.GOAL_BACKGROUND, 1);
            this.sprite_panel = displaySpriteOnScreen(this.game, this.sprite_panel, 'goalScreen_panel', 401, 250);
            this.button_start = displaySpriteButtonOnScreen(this, this.button_start, 'goalScreen_startButton', 'goalScreen_startButton_inv', BabyTrader.Play.removePanelDisplayScreen, 526, 452);
            this.button_backToTitle = displaySpriteButtonOnScreen(this, this.button_backToTitle, 'goalScreen_backToTitleButton', 'goalScreen_backToTitleButton_inv', BabyTrader.Play.goBackToTitle, 263, 452);
            this.text_money = displayTextOnScreen(this.game, this.text_money, '', BabyTrader.Play.greenFontStyle, 564, 312, 1, 0);
            this.text_time = displayTextOnScreen(this.game, this.text_time, '', BabyTrader.Play.greenFontStyle, 564, 246, 1, 0);
        };
        Play.prototype.updateText = function () {
            if (this.text_money) {
                this.text_money.setText("$" + String(this.money_goal - this.money_current));
            }
            if (this.text_time) {
                this.text_time.setText(BabyTrader.Play.getTimeInFormat(this.gameTime));
            }
        };
        Play.getTimeInFormat = function (timeInSecond) {
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
        };
        Play.greenFontStyle = { font: "900 26px Sarpanch", fill: BabyTrader.Const.GREENCOLOR_STRING, align: "right" };
        return Play;
    })(Phaser.State);
    BabyTrader.Play = Play;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=play.js.map