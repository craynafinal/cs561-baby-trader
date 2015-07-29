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
            this.prologueSprites = null;
            this.spriteIndex = 0;
            this.sprite = null;
            this.dialogLocation = null;
        }
        Prologue.prototype.preload = function () {
            // setup sprites
            this.prologueSprites = [
                'sprite_prologue_01',
                'sprite_prologue_02'
            ];
        };
        Prologue.prototype.create = function () {
            // skip key setup
            setupKeyboardHotkeys(this.game, this.key_skip, Phaser.Keyboard.ESC, this.skipToPlay, this);
            // skip instruction
            this.game.add.bitmapText(20, 20, 'carrier_command', 'Press ESC to skip', 14);
            // set the bg color
            this.game.stage.backgroundColor = BabyTrader.Const.PROLOGUE_BACKGROUND;
            // update event
            this.game.time.events.repeat(Phaser.Timer.SECOND * 8, this.prologueSprites.length + 1, this.nextMove, this);
            // text printing start
            //this.dialogLocation = this.game.add.text(this.game.world.centerX, 500, '', { font: "35px Arial", fill: "#ffffff", align: "center" });
            this.dialogLocation = this.game.add.bitmapText(this.game.world.centerX, 500, 'carrier_command', '', 18);
            this.dialogLocation.anchor.setTo(.5);
            BabyTrader.Dialog.startDialog(this.game, this.dialogLocation, BabyTrader.Dialog.prologue);
        };
        Prologue.prototype.update = function () {
        };
        Prologue.prototype.skipToPlay = function () {
            this.game.state.start("play");
        };
        Prologue.prototype.nextMove = function () {
            if (this.spriteIndex >= this.prologueSprites.length) {
                this.skipToPlay();
            }
            else {
                this.switchSprite();
            }
        };
        Prologue.prototype.switchSprite = function () {
            if (this.spriteIndex > 0) {
                this.game.add.tween(this.sprite).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            }
            this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, this.prologueSprites[this.spriteIndex++]);
            this.sprite.anchor.setTo(.5);
            // set initial transparency to zero
            this.sprite.alpha = 0;
            this.game.add.tween(this.sprite).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        };
        return Prologue;
    })(Phaser.State);
    BabyTrader.Prologue = Prologue;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=prologue.js.map