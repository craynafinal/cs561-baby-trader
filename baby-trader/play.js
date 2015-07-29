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
            this.pauseOverlay = null;
            this.pauseState = false;
            this.sprite_template = null;
            this.button_arrowLeft = null;
            this.button_arrowRight = null;
            this.button_business = null;
            this.button_charge = null;
            this.button_pause = null;
            this.button_talent = null;
        }
        Play.prototype.preload = function () {
        };
        Play.prototype.create = function () {
            // setup keys
            setupKeyboardHotkeys(this.game, this.key_pause, Phaser.Keyboard.ESC, this.pauseOrResumeGame, this);
            // setup background color
            this.game.stage.backgroundColor = BabyTrader.Const.TEMPLATE_BACKGROUND;
            // template
            this.sprite_template = displaySpriteOnScreen(this.game, this.sprite_template, 'template_template', 0, 0, 0, 0);
            // button setups
            this.button_arrowLeft = displaySpriteButtonOnScreen(this.game, this.button_arrowLeft, 'template_arrowLeft', 'template_arrowLeft_inv', null, 543, 380);
            this.button_arrowRight = displaySpriteButtonOnScreen(this.game, this.button_arrowRight, 'template_arrowRight', 'template_arrowRight_inv', null, 762, 380);
            this.button_business = displaySpriteButtonOnScreen(this.game, this.button_business, 'template_businessButton', 'template_businessButton_inv', null, 693, 536);
            this.button_charge = displaySpriteButtonOnScreen(this.game, this.button_charge, 'template_chargeButton', 'template_chargeButton_inv', null, 553, 562);
            this.button_pause = displaySpriteButtonOnScreen(this.game, this.button_pause, 'template_pauseButton', 'template_pauseButton_inv', null, 693, 466);
            this.button_talent = displaySpriteButtonOnScreen(this.game, this.button_talent, 'template_talentButton', 'template_talentButton_inv', null, 487, 562);
        };
        Play.prototype.update = function () {
        };
        Play.prototype.pauseOrResumeGame = function () {
            if (!this.pauseOverlay) {
                this.pauseState = true;
                this.pauseGame();
            }
            else {
                this.pauseState = false;
                this.resumeGame();
            }
        };
        Play.prototype.resumeGame = function () {
            this.pauseOverlay.destroy();
            this.pauseOverlay = null;
        };
        Play.prototype.pauseGame = function () {
            this.pauseOverlay = this.game.add.graphics(0, 0);
            this.pauseOverlay.beginFill(0x000000, 0.7);
            this.pauseOverlay.drawRect(0, 0, 800, 600);
            this.pauseOverlay.endFill();
            this.pauseOverlay.inputEnabled = true;
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