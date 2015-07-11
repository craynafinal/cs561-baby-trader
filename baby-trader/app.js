/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
/// <reference path="phaser/phaser.d.ts"/>
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: preload, create: create });
var global_bgm = null;
function preload() {
    this.game.load.image('startPage_title', 'assets/graphics/startPage_title.png');
    this.game.load.image('startPage_babyTrader', 'assets/graphics/startPage_babyTrader.png');
    this.game.load.audio('se_babyCrying', 'assets/sounds/se_babyCrying.wav');
    this.game.load.audio('bgm_pink65', 'assets/sounds/bgm_pink65.mp3');
    this.game.load.bitmapFont('carrier_command', 'assets/bitmapFonts/nokia.png', 'assets/bitmapFonts/nokia.xml');
}
function create() {
    playBackgroundSound('bgm_pink65');
    displayStartScreen();
}
function playBackgroundSound(music) {
    this.global_bgm = this.game.add.audio(music);
    this.global_bgm.loop = true;
    this.global_bgm.play();
}
function stopBackgroundSound() {
    this.global_bgm.stop();
}
function displayStartScreen() {
    // set background color
    this.game.stage.backgroundColor = "#b62b1d";
    // show title and enable dragging
    var title = this.game.add.sprite(40, 46, 'startPage_title');
    title.inputEnabled = true;
    title.input.enableDrag();
    // show title illustration and set up inputs
    var illustration = this.game.add.sprite(316, 53, 'startPage_babyTrader');
    var babyCryingSound = this.game.add.audio('se_babyCrying');
    var babyArea = new Phaser.Rectangle(377, 368, 150, 139);
    /*
    startPage_illustration.events.onInputOver.add(function () {
        startPage_illustration.tint = '#000000';
    }, this);
    startPage_illustration.events.onInputOut.add(function () {
        startPage_illustration.tint = null;
    }, this);
    startPage_illustration.events.onInputUp.add(function () {
        if (!soundEffect_babyCrying.isPlaying) {
            soundEffect_babyCrying.play();
        }
    }, this);
    */
    var startButton = this.game.add.bitmapText(80, 350, 'carrier_command', 'START GAME', 34);
    startButton.inputEnabled = true;
    startButton.events.onInputUp.add(function () {
        newGame();
    });
    var howToPlayButton = this.game.add.bitmapText(80, 400, 'carrier_command', 'HOW TO PLAY', 34);
    howToPlayButton.inputEnabled = true;
    howToPlayButton.events.onInputUp.add(function () {
    });
    var creditsButton = this.game.add.bitmapText(80, 450, 'carrier_command', 'CREDITS', 34);
    creditsButton.inputEnabled = true;
    creditsButton.events.onInputUp.add(function () {
    });
    // background fade in
    //background.alpha = 0;
    //tween = this.game.add.tween(background).to({ alpha: 1 }, 2000, "Linear", true);
    // need to implement other buttons, should pop temporary screen on the top
    // so it can go back to the previous screen
    // how to play button
    // credit button   
}
function newGame() {
    stopBackgroundSound();
    this.game.world.removeAll();
    displayGameScreen();
}
function displayGameScreen() {
    alert("not implemented yet");
}
window.onload = function () {
};
//# sourceMappingURL=app.js.map