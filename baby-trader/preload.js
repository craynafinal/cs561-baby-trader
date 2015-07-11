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
    var Preload = (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            _super.call(this);
        }
        Preload.prototype.preload = function () {
            this.preloadIcon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadIcon');
            this.preloadIcon.anchor.set(0.5, 0.5);
            this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.game.load.setPreloadSprite(this.preloadIcon);
            this.game.load.image('startPage_title', 'assets/graphics/startPage_title.png');
            this.game.load.image('startPage_babyTrader', 'assets/graphics/startPage_babyTrader.png');
            this.game.load.audio('se_babyCrying', 'assets/sounds/se_babyCrying.wav');
            this.game.load.audio('bgm_pink65', 'assets/sounds/bgm_pink65.mp3');
            this.game.load.bitmapFont('carrier_command', 'assets/bitmapFonts/nokia.png', 'assets/bitmapFonts/nokia.xml');
        };
        Preload.prototype.create = function () {
            this.preloadIcon.cropEnabled = false;
        };
        Preload.prototype.update = function () {
            if (!!this.ready) {
                this.game.state.start('title');
            }
        };
        Preload.prototype.onLoadComplete = function () {
            this.ready = true;
        };
        return Preload;
    })(Phaser.State);
    BabyTrader.Preload = Preload;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=preload.js.map