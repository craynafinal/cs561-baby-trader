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
            // sound effects
            this.game.load.audio('se_babyCrying', 'assets/sounds/se_babyCrying.wav');
            // bgm
            this.game.load.audio('bgm_pink65', 'assets/sounds/bgm_pink65.mp3');
            // fonts
            this.game.load.bitmapFont('carrier_command', 'assets/bitmapFonts/nokia.png', 'assets/bitmapFonts/nokia.xml');
            // sprites: title
            this.game.load.image('startPage_title', 'assets/sprites/startPage_title_244x177.png');
            this.game.load.image('startPage_babyTrader', 'assets/sprites/startPage_babyTrader_558x326.png');
            this.game.load.image('startPage_copyright', 'assets/sprites/startPage_copyright_171x533.png');
            this.game.load.image('startPage_creditsButton', 'assets/sprites/startPage_creditsButton_191x463.png');
            this.game.load.image('startPage_creditsButton_inv', 'assets/sprites/startPage_creditsButton_inv_191x463.png');
            this.game.load.image('startPage_howToPlayButton', 'assets/sprites/startPage_howToPlayButton_191x410.png');
            this.game.load.image('startPage_howToPlayButton_inv', 'assets/sprites/startPage_howToPlayButton_inv_191x410.png');
            this.game.load.image('startPage_startButton', 'assets/sprites/startPage_startButton_191x357.png');
            this.game.load.image('startPage_startButton_inv', 'assets/sprites/startPage_startButton_inv_191x357.png');
            // sprites: prologue
            this.game.load.image('sprite_prologue_01', 'assets/sprites/babyTrader_temp.png');
            this.game.load.image('sprite_prologue_02', 'assets/sprites/customer_temp.png');
            // sprites: goal screen
            this.game.load.image('goalScreen_backToTitleButton', 'assets/sprites/goalScreen_backToTitleButton_263x452.png');
            this.game.load.image('goalScreen_backToTitleButton_inv', 'assets/sprites/goalScreen_backToTitleButton_inv_263x452.png');
            this.game.load.image('goalScreen_panel', 'assets/sprites/goalScreen_panel_401x250.png');
            this.game.load.image('goalScreen_startButton', 'assets/sprites/goalScreen_startButton_526x452.png');
            this.game.load.image('goalScreen_startButton_inv', 'assets/sprites/goalScreen_startButton_inv_526x452.png');
            this.game.load.image('goalScreen_titleFail', 'assets/sprites/goalScreen_titleFail_393x144.png');
            this.game.load.image('goalScreen_titleSuccess', 'assets/sprites/goalScreen_titleSuccess_393x144.png');
            // sprites: result screen
            this.game.load.image('resultScreen_backToTitleButton', 'assets/sprites/resultScreen_backToTitleButton_292x487.png');
            this.game.load.image('resultScreen_backToTitleButton_inv', 'assets/sprites/resultScreen_backToTitleButton_inv_292x487.png');
            this.game.load.image('resultScreen_nextLevelButton', 'assets/sprites/resultScreen_nextLevelButton_526x487.png');
            this.game.load.image('resultScreen_nextLevelButton_inv', 'assets/sprites/resultScreen_nextLevelButton_inv_526x487.png');
            this.game.load.image('resultScreen_panel', 'assets/sprites/resultScreen_panel_401x252.png');
            // sprites: template
            this.game.load.image('template_arrowLeft', 'assets/sprites/template_arrowLeft_543x380.png');
            this.game.load.image('template_arrowLeft_inv', 'assets/sprites/template_arrowLeft_inv_543x380.png');
            this.game.load.image('template_arrowRight', 'assets/sprites/template_arrowRight_762x380.png');
            this.game.load.image('template_arrowRight_inv', 'assets/sprites/template_arrowRight_inv_762x380.png');
            this.game.load.image('template_businessButton', 'assets/sprites/template_businessButton_693x536.png');
            this.game.load.image('template_businessButton_inv', 'assets/sprites/template_businessButton_inv_693x536.png');
            this.game.load.image('template_chargeButton', 'assets/sprites/template_chargeButton_533x562.png');
            this.game.load.image('template_chargeButton_inv', 'assets/sprites/template_chargeButton_inv_533x562.png');
            this.game.load.image('template_pauseButton', 'assets/sprites/template_pauseButton_693x466.png');
            this.game.load.image('template_pauseButton_inv', 'assets/sprites/template_pauseButton_inv_693x466.png');
            this.game.load.image('template_talentButton', 'assets/sprites/template_talentButton_487x562.png');
            this.game.load.image('template_talentButton_inv', 'assets/sprites/template_talentButton_inv_487x562.png');
            this.game.load.image('template_template', 'assets/sprites/template_template_center.png');
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