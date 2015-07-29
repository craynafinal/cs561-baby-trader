/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

/// <reference path="phaser/phaser.d.ts"/>

module BabyTrader {
    export class Game {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { create: this.create });
        }

        create() {
            this.game.state.add("boot", BabyTrader.Boot, true);
            this.game.state.add("preload", BabyTrader.Preload, true);
            this.game.state.add("prologue", BabyTrader.Prologue, true);
            this.game.state.add("title", BabyTrader.Title, true);
            this.game.state.add("play", BabyTrader.Play, true);
            this.game.state.start("boot");
        }
    }
}

window.onload = () => {
    var game = new BabyTrader.Game();
}