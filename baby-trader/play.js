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
            this.greenFontStyle = { font: "900 26px Sarpanch", fill: BabyTrader.Const.GREENCOLOR_STRING, align: "right" };
            this.isPreparationDone = false;
            this.cheatGauge_sprite = null;
            this.cheatGauge_value = 0;
            this.gameMode = BabyTrader.Const.GAMEMODE_GOAL;
        }
        Play.prototype.preload = function () {
        };
        Play.prototype.create = function () {
            // setup bgm
            playBackgroundSound(this.game, 'bgm_play');
            // setup keys
            setupKeyboardHotkeys(this.game, this.key_pause, Phaser.Keyboard.ESC, this.pauseOrResumeGame, this);
            // setup background color
            this.game.stage.backgroundColor = BabyTrader.Const.TEMPLATE_BACKGROUND;
            // template
            this.sprite_template = displaySpriteOnScreen(this.game, this.sprite_template, 'template_template', 0, 0, 0, 0);
            var chatGaugeFunction = function (currentObject) {
                if (currentObject.cheatGauge_value < BabyTrader.Const.CHEATGAUGE_MAX) {
                    currentObject.cheatGauge_value = currentObject.cheatGauge_value + 5;
                }
            };
            // button setups
            this.button_arrowLeft = displaySpriteButtonOnScreen(this, this.button_arrowLeft, 'template_arrowLeft', 'template_arrowLeft_inv', null, 543, 380);
            this.button_arrowRight = displaySpriteButtonOnScreen(this, this.button_arrowRight, 'template_arrowRight', 'template_arrowRight_inv', null, 762, 380);
            this.button_business = displaySpriteButtonOnScreen(this, this.button_business, 'template_businessButton', 'template_businessButton_inv', null, 693, 536);
            this.button_charge = displaySpriteButtonOnScreen(this, this.button_charge, 'template_chargeButton', 'template_chargeButton_inv', chatGaugeFunction, 553, 562);
            this.button_pause = displaySpriteButtonOnScreen(this, this.button_pause, 'template_pauseButton', 'template_pauseButton_inv', this.pauseOrResumeGame, 693, 466);
            this.button_talent = displaySpriteButtonOnScreen(this, this.button_talent, 'template_talentButton', 'template_talentButton_inv', null, 487, 562);
            this.setupTimeAndMoney();
            this.displayGoalScreen();
        };
        Play.prototype.update = function () {
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
            if (this.cheatGauge_value >= BabyTrader.Const.CHEATGAUGE_MAX) {
                //BabyTrader.Const.YELLOWCOLOR
                this.cheatGauge_sprite.graphicsData[0].fillColor = 0xffff00;
                console.log(this.cheatGauge_sprite.graphicsData[0]);
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
        };
        Play.prototype.releaseTalentCheat = function () {
            if (this.cheatGauge_value >= BabyTrader.Const.CHEATGAUGE_MAX) {
                this.cheatGauge_value = 0;
            }
        };
        Play.prototype.resetCheatGauge = function () {
            this.cheatGauge_value = 5;
        };
        Play.prototype.increaseCheatGauge = function () {
            if (this.cheatGauge_value < BabyTrader.Const.CHEATGAUGE_MAX) {
                this.cheatGauge_value = this.cheatGauge_value + 5;
            }
        };
        Play.prototype.reduceGameLevel = function () {
            if (this.money_current < this.money_goal) {
                this.gameLevel--;
            }
        };
        Play.prototype.removePlayScreen = function () {
            this.text_money.destroy();
            this.text_time.destroy();
        };
        Play.prototype.displayResultScreen = function () {
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
            this.button_start = displaySpriteButtonOnScreen(this, this.button_start, goButtonSpriteName, goButtonInvSpriteName, this.removePanelDisplayScreen, 526, 487);
            this.button_backToTitle = displaySpriteButtonOnScreen(this, this.button_backToTitle, 'resultScreen_backToTitleButton', 'resultScreen_backToTitleButton_inv', this.goBackToTitle, 292, 487);
            this.text_time = displayTextOnScreen(this.game, this.text_time, this.getTimeInFormat(this.gameTime_initial - this.gameTime), this.greenFontStyle, 564, 215, 1, 0);
            this.text_money = displayTextOnScreen(this.game, this.text_money, '$' + String(this.money_current), this.greenFontStyle, 564, 281, 1, 0);
            this.text_goal = displayTextOnScreen(this.game, this.text_goal, '$' + String(this.money_goal), this.greenFontStyle, 564, 347, 1, 0);
            this.reduceGameLevel();
        };
        Play.prototype.removePanelDisplayScreen = function (currentObject) {
            currentObject.overlay.destroy();
            currentObject.sprite_panel.destroy();
            currentObject.button_start.destroy();
            currentObject.button_backToTitle.destroy();
            currentObject.text_money.destroy();
            currentObject.text_time.destroy();
            if (currentObject.text_goal) {
                currentObject.text_goal.destroy();
            }
            if (currentObject.sprite_panelTitle) {
                currentObject.sprite_panelTitle.destroy();
            }
            if (currentObject.cheatGauge_sprite) {
                currentObject.cheatGauge_sprite.destroy();
            }
            currentObject.isPreparationDone = true;
        };
        Play.prototype.setupTimeAndMoney = function () {
            this.money_goal = (this.gameLevel * 20) + 100;
            this.gameTime = 10 + (this.gameLevel * 10);
            this.gameTime_initial = this.gameTime;
            this.gameLevel++;
        };
        Play.prototype.pauseOrResumeGame = function (currentObject) {
            if (!currentObject.pauseState) {
                currentObject.pauseState = true;
                currentObject.game.time.events.pause();
                currentObject.setButtonInputs(currentObject, false);
            }
            else {
                currentObject.pauseState = false;
                currentObject.game.time.events.resume();
                currentObject.setButtonInputs(currentObject, true);
            }
        };
        Play.prototype.setButtonInputs = function (currentObject, trueOrFalse) {
            currentObject.button_arrowLeft.inputEnabled = trueOrFalse;
            currentObject.button_arrowRight.inputEnabled = trueOrFalse;
            currentObject.button_business.inputEnabled = trueOrFalse;
            currentObject.button_charge.inputEnabled = trueOrFalse;
            currentObject.button_talent.inputEnabled = trueOrFalse;
        };
        Play.prototype.startGame = function () {
            this.gameMode = BabyTrader.Const.GAMEMODE_PLAY;
            this.text_money = displayTextOnScreen(this.game, this.text_money, '', this.greenFontStyle, 461, 471, 1, 0);
            this.text_time = displayTextOnScreen(this.game, this.text_time, '', this.greenFontStyle, 572, 471, 1, 0);
            this.game.time.events.repeat(Phaser.Timer.SECOND * 1, this.gameTime, this.decrementSecond, this);
            this.resetCheatGauge();
            this.game.time.events.start();
            this.game.time.events.loop(Phaser.Timer.SECOND * 1, this.increaseCheatGauge, this);
            this.cheatGauge_sprite = displaySolidRectangular(this.game, this.cheatGauge_sprite, BabyTrader.Const.GREENCOLOR, 1, 190, 18, 245, 553);
        };
        Play.prototype.decrementSecond = function () {
            if (this.gameTime > 0) {
                this.gameTime--;
            }
        };
        Play.prototype.goBackToTitle = function (currentObject) {
            currentObject.gameLevel = 0;
            currentObject.game.state.start('title');
        };
        Play.prototype.displayGoalScreen = function () {
            this.gameMode = BabyTrader.Const.GAMEMODE_GOAL;
            this.overlay = displaySolidBackground(this.game, this.overlay, BabyTrader.Const.GOAL_BACKGROUND, 1);
            this.sprite_panel = displaySpriteOnScreen(this.game, this.sprite_panel, 'goalScreen_panel', 401, 250);
            this.button_start = displaySpriteButtonOnScreen(this, this.button_start, 'goalScreen_startButton', 'goalScreen_startButton_inv', this.removePanelDisplayScreen, 526, 452);
            this.button_backToTitle = displaySpriteButtonOnScreen(this, this.button_backToTitle, 'goalScreen_backToTitleButton', 'goalScreen_backToTitleButton_inv', this.goBackToTitle, 263, 452);
            this.text_money = displayTextOnScreen(this.game, this.text_money, '', this.greenFontStyle, 564, 246, 1, 0);
            this.text_time = displayTextOnScreen(this.game, this.text_time, '', this.greenFontStyle, 564, 312, 1, 0);
        };
        Play.prototype.updateText = function () {
            if (this.text_money) {
                this.text_money.setText("$" + String(this.money_goal - this.money_current));
            }
            if (this.text_time) {
                this.text_time.setText(this.getTimeInFormat(this.gameTime));
            }
        };
        Play.prototype.getTimeInFormat = function (timeInSecond) {
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
        Play.prototype.startDialog = function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !this.pauseState) {
                console.log("activated");
            }
        };
        return Play;
    })(Phaser.State);
    BabyTrader.Play = Play;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=play.js.map