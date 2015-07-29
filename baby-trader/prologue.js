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
    var Prologue = (function (_super) {
        __extends(Prologue, _super);
        function Prologue() {
            _super.call(this);
            this.key_skip = null;
            this.prologueSprite = null;
            this.dialogLocation = null;
        }
        Prologue.prototype.preload = function () {
        };
        Prologue.prototype.create = function () {
            // skip key setup
            setupKeyboardHotkeys(this.game, this.key_skip, Phaser.Keyboard.ESC, function () { this.game.state.start("play"); }, this);
            // set the bg color
            this.game.stage.backgroundColor = BabyTrader.Const.PROLOGUE_BACKGROUND;
            // after certain time, it will skip to the next state
            this.game.time.events.add(Phaser.Timer.SECOND * 10, this.skipToPlay, this);
            // text printing start
            this.dialogLocation = displayTextOnScreen(this.game, this.dialogLocation, '', { font: "bold 18px Arial", fill: "#ffffff", align: "center" }, this.game.world.centerX, 500);
            // start prologue
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.startPrologue, this);
        };
        Prologue.prototype.update = function () {
        };
        Prologue.prototype.startPrologue = function () {
            var skipFunction = function (game) {
                game.state.start("play");
            };
            // skip instruction
            var skipText = displayTextButtonOnScreen(this.game, skipText, 'Please click here or press ESC button to skip.', { font: "bold 12px Arial", fill: "#ffffff", align: "left" }, skipFunction, 20, 20, 0, 0);
            // display illustration sprite and add tweens
            this.prologueSprite = displaySpriteOnScreen(this.game, this.prologueSprite, 'prologue_babyTrader', this.game.world.centerX, this.game.world.centerY);
            addFadeTweenToSprite(this.game, this.prologueSprite, 0, 1, 1000);
            BabyTrader.Dialog.startDialog(this.game, this.dialogLocation, BabyTrader.Dialog.prologue);
        };
        Prologue.prototype.skipToPlay = function () {
            addFadeTweenToSprite(this.game, this.prologueSprite, 1, 0, 1000);
            this.dialogLocation.destroy();
            var nextStateFunction = function () {
                this.game.state.start("play");
            };
            this.game.time.events.add(Phaser.Timer.SECOND * 2, nextStateFunction, this);
        };
        return Prologue;
    })(Phaser.State);
    BabyTrader.Prologue = Prologue;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=prologue.js.map