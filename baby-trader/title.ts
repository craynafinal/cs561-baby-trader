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

        title;
        illustration;
        sound;
        startButton;
        howToPlayButton;
        creditButton;

        preload() {
        }

        create() {
            // set background color
            this.game.stage.backgroundColor = Const.Color.TITLE_BACKGROUND;

            // play bgm
            playBackgroundSound(this.game, 'bgm_pink65');

            // show title and enable dragging
            this.title = this.game.add.sprite(40, 46, 'startPage_title');
            this.title.inputEnabled = true;
            this.title.input.useHandCursor = true;
            this.title.input.enableDrag();

            // show title illustration
            this.illustration = this.game.add.sprite(316, 53, 'startPage_babyTrader');

            // show text buttons
            this.sound = this.game.add.audio('se_babyCrying');
            var goToPlayState = function (game) {
                game.state.start("play");
                stopBackgroundSound();
            };
            var showHowToPlay = function (game) {
                console.log("how to play");
            };
            var showCredits = function (game) {
                console.log("credits");
            };
            displayTextButton(this.game, this.startButton, 80, 350, "START GAME", 34, this.sound, goToPlayState);
            displayTextButton(this.game, this.howToPlayButton, 80, 400, "HOW TO PLAY", 34, this.sound, showHowToPlay);
            displayTextButton(this.game, this.creditButton, 80, 450, "CREDITS", 34, this.sound, showCredits);

        }

        update() {
        }
    }
    
    function displayTextButton(game, textButtonElement, x: number, y: number, text: string, fontSize: number, sound, method) {
        textButtonElement = game.add.bitmapText(x, y, 'carrier_command', text, fontSize);
        textButtonElement.inputEnabled = true;
        textButtonElement.input.useHandCursor = true;
        textButtonElement.events.onInputOver.add(function () {
            textButtonElement.fontSize = fontSize * 1.2;
        });
        textButtonElement.events.onInputOut.add(function () {
            textButtonElement.fontSize = fontSize;
        });
        textButtonElement.events.onInputUp.add(function () {
            method(game);
            if (!sound.isPlaying) {
                sound.play();
            }
        });
    }
} 