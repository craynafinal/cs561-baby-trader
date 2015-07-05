/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
/// <reference path="phaser/phaser.d.ts"/>
var game = new Phaser.Game(1024, 576, Phaser.AUTO, 'content', { preload: preload, create: create });
var tween;
function preload() {
    this.game.load.image('title', 'resources/text_title.png');
}
function create() {
    //this.game.stage.backgroundColor = "#ffffff";
    var title = this.game.add.sprite(this.game.world.centerX, 200, 'title');
    title.anchor.setTo(0.5, 0.5);
    // logo tween
    title.alpha = 0;
    tween = this.game.add.tween(title).to({ alpha: 1 }, 2000, "Linear", true);
    //tween.onComplete.add(function () { title.destroy(); });
    var style = { font: "24px Arial", fill: "#ffffff", align: "center" };
    var text = this.game.add.text(this.game.world.centerX, 500, "Start Game\nHow To Play", style);
    text.anchor.set(0.5, 0.5);
}
window.onload = function () {
};
//# sourceMappingURL=app.js.map