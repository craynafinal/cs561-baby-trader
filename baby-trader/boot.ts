/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Boot extends Phaser.State {
        constructor() {
            super();
        }

        preload() {
            this.game.load.image('preloadIcon', 'assets/graphics/preloader.gif');
        }

        create() {
            this.game.state.start("preload");
        }

        update() {
        }
    }
}