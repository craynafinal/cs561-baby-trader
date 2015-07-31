/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Title extends Phaser.State {
        constructor() {
            super();
        }

        private title;
        private illustration;
        private startButton;
        private howToPlayButton;
        private creditsButton;
        private copyright;

        preload() {
        }

        create() {
            // play bgm
            playBackgroundSound(this.game, 'bgm_title');

            // set background color
            this.game.stage.backgroundColor = Const.TITLE_BACKGROUND;

            // show title and enable dragging
            this.title = displaySpriteOnScreen(this.game, this.title, 'startPage_title', 244, 177);
            this.title.inputEnabled = true;
            this.title.input.useHandCursor = true;
            this.title.input.enableDrag();

            // show title illustration
            this.illustration = displaySpriteOnScreen(this.game, this.illustration, 'startPage_babyTrader', 558, 326);

            var startPrologueFunction = function (currentObject) {
                currentObject.game.state.start('prologue');
            };

            // button setups
            this.startButton = displaySpriteButtonOnScreen(this, this.startButton, 'startPage_startButton', 'startPage_startButton_inv', startPrologueFunction, 191, 357);
            this.howToPlayButton = displaySpriteButtonOnScreen(this, this.howToPlayButton, 'startPage_howToPlayButton', 'startPage_howToPlayButton_inv', null, 191, 410);
            this.creditsButton = displaySpriteButtonOnScreen(this, this.creditsButton, 'startPage_creditsButton', 'startPage_creditsButton_inv', null, 191, 463);

            // copyright
            this.copyright = displaySpriteOnScreen(this.game, this.copyright, 'startPage_copyright', 171, 533);
        }

        update() {
        }
    }
} 