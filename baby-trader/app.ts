/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

/// <reference path="phaser/phaser.d.ts"/>

var game = new Phaser.Game(1024, 576, Phaser.AUTO, 'content', { preload: preload, create: create });
var tween = null;
var title = null;
var startButton = null;

function preload() {
    this.game.load.image('title', 'resources/text_title.png');
}

function create() {
    displayTitle();
    
    // start button
    startButton = game.add.button(game.world.centerX, 400, 'title', newGame, this, 2, 1, 0);
    startButton.onInputOver.add(function () { }, this);
    startButton.onInputOut.add(function () { }, this);
    //startButton.onInputUp.add(function () { newGame(); }, this);
}

function displayTitle() {
    title = this.game.add.sprite(this.game.world.centerX, 200, 'title');
    title.anchor.setTo(0.5, 0.5);
    
    // logo tween
    title.alpha = 0;
    tween = this.game.add.tween(title).to({ alpha: 1 }, 2000, "Linear", true);

    // need to implement other buttons, should pop temporary screen on the top
    // so it can go back to the previous screen

    // how to play button
    // credit button   
}

function newGame() {
    destroyStartScreen();
}

function destroyStartScreen() {
    // should remove all items in the start screen
    title.destroy();
    startButton.destroy();
}

window.onload = () => {  
};