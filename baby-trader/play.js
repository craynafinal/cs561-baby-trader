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
            this.sprite_goal = null;
            this.button_arrowLeft = null;
            this.button_arrowRight = null;
            this.button_business = null;
            this.button_charge = null;
            this.button_pause = null;
            this.button_talent = null;
            this.button_goalStart = null;
            this.button_goalBack = null;
            this.gameLevel = 0;
            this.gameTime = 0;
            this.money_current = 0;
            this.money_goal = 0;
            this.text_money = null;
            this.text_time = null;
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
            // button setups
            this.button_arrowLeft = displaySpriteButtonOnScreen(this, this.button_arrowLeft, 'template_arrowLeft', 'template_arrowLeft_inv', null, 543, 380);
            this.button_arrowRight = displaySpriteButtonOnScreen(this, this.button_arrowRight, 'template_arrowRight', 'template_arrowRight_inv', null, 762, 380);
            this.button_business = displaySpriteButtonOnScreen(this, this.button_business, 'template_businessButton', 'template_businessButton_inv', null, 693, 536);
            this.button_charge = displaySpriteButtonOnScreen(this, this.button_charge, 'template_chargeButton', 'template_chargeButton_inv', null, 553, 562);
            this.button_pause = displaySpriteButtonOnScreen(this, this.button_pause, 'template_pauseButton', 'template_pauseButton_inv', null, 693, 466);
            this.button_talent = displaySpriteButtonOnScreen(this, this.button_talent, 'template_talentButton', 'template_talentButton_inv', null, 487, 562);
            this.setupTimeAndMoney();
            this.displayGoalScreen();
        };
        Play.prototype.update = function () {
            this.updateText();
        };
        Play.prototype.setupTimeAndMoney = function () {
            this.money_goal = (this.gameLevel * 20) + 100;
            this.gameTime = 60 + (this.gameLevel * 10);
            this.gameLevel++;
        };
        Play.prototype.pauseOrResumeGame = function () {
            if (!this.overlay) {
                this.pauseState = true;
                this.pauseGame();
            }
            else {
                this.pauseState = false;
                this.resumeGame();
            }
        };
        Play.prototype.resumeGame = function () {
            this.overlay.destroy();
            this.overlay = null;
        };
        Play.prototype.pauseGame = function () {
            displaySolidBackground(this.game, this.overlay, 0x000000, .7);
        };
        Play.prototype.startGame = function () {
        };
        Play.prototype.displayGoalScreen = function () {
            this.overlay = displaySolidBackground(this.game, this.overlay, BabyTrader.Const.BEGIN_BACKGROUND, 1);
            this.sprite_goal = displaySpriteOnScreen(this.game, this.sprite_goal, 'goalScreen_panel', 401, 250);
            var goBackToTitleFunction = function (currentObject) {
                currentObject.game.state.start('title');
            };
            var removeDisplayGoalScreenFunction = function (currentObject) {
                currentObject.overlay.destroy();
                currentObject.sprite_goal.destroy();
                currentObject.button_goalStart.destroy();
                currentObject.button_goalBack.destroy();
                currentObject.text_money.destroy();
                currentObject.text_time.destroy();
            };
            this.button_goalStart = displaySpriteButtonOnScreen(this, this.button_goalStart, 'goalScreen_startButton', 'goalScreen_startButton_inv', removeDisplayGoalScreenFunction, 526, 452);
            this.button_goalBack = displaySpriteButtonOnScreen(this, this.button_goalBack, 'goalScreen_backToTitleButton', 'goalScreen_backToTitleButton_inv', goBackToTitleFunction, 263, 452);
            var fontStyle = { font: "900 26px Sarpanch", fill: "#35eb35", align: "right" };
            this.text_money = displayTextOnScreen(this.game, this.text_money, '', fontStyle, 564, 246, 1, 0);
            this.text_time = displayTextOnScreen(this.game, this.text_time, '', fontStyle, 564, 312, 1, 0);
        };
        Play.prototype.updateText = function () {
            if (this.text_money) {
                this.text_money.setText("$" + String(this.money_goal - this.money_current));
            }
            if (this.text_time) {
                var hour = Math.floor(this.gameTime / 60);
                var minute = this.gameTime;
                var format = "";
                if (hour > 0) {
                    minute = this.gameTime - (hour * 60);
                }
                if (minute <= 9) {
                    format = "0";
                }
                this.text_time.setText(String(hour) + ":" + format + minute);
            }
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