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

        private title = null;
        private illustration = null;
        private startButton = null;
        private howToPlayButton = null;
        private creditsButton = null;
        private copyright = null;
        private overlay = null;
        private subMenuTitle = null;
        private screenExample = null;
        private howToPlayText = null;
        private backToTitleButton = null;
        private creditTexts = null;

        preload() {
        }

        create() {
            // play bgm
            playBackgroundSound(this.game, 'bgm_title');

            // set background color
            this.game.stage.backgroundColor = BabyTrader.Const.TITLE_BACKGROUND;

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
            this.howToPlayButton = displaySpriteButtonOnScreen(this, this.howToPlayButton, 'startPage_howToPlayButton', 'startPage_howToPlayButton_inv', BabyTrader.Title.displayHowToPlayScreen, 191, 410);
            this.creditsButton = displaySpriteButtonOnScreen(this, this.creditsButton, 'startPage_creditsButton', 'startPage_creditsButton_inv', BabyTrader.Title.displayCreditScreen, 191, 463);

            // copyright
            this.copyright = displaySpriteOnScreen(this.game, this.copyright, 'startPage_copyright', 171, 533);
        }

        update() {
        }

        static displayHowToPlayScreen(currentObject) {
            var explainText = (
                  "【1】 Displaying Customer.\n"
                + "【2】 Customers’s message, you will need to figure out what kind of baby your customer wants by reading this text.\n"
                + "【3】 Displaying baby.\n"
                + "【4】 Baby’s attributes, which should match customer’s needs on the left.\n"
                + "【5】 Click the arrow buttons to browse babies.\n"
                + "【6】 Pause button.\n"
                + "【7】 Click this button to suggest this baby.\n"
                + "【8】 The amount of time left.\n"
                + "【9】 The amount of money you need to make to win the current stage.\n"
                + "【10】 Baby talent cheater.When gauge is full, you can click the release button to change the baby’s unnecessary attribute into what your customer wants.The gauge will charge up by itself or click charge button multiple times to make it quicker.")
                .toUpperCase();

            currentObject.overlay = displaySolidBackground(currentObject.game, currentObject.overlay, BabyTrader.Const.GOAL_BACKGROUND, 1);
            currentObject.subMenuTitle = displaySpriteOnScreen(currentObject.game, currentObject.subMenuTitle, 'howToPlay_title', 400, 80);
            currentObject.screenExample = displaySpriteOnScreen(currentObject.game, currentObject.screenExample, 'howToPlay_screenExample', 42, 142, 0, 0);
            currentObject.howToPlayText = displayTextOnScreen(currentObject.game, currentObject.howToPlayText, explainText, { font: "600 12px Work Sans", fill: Const.PROLOGUE_BACKGROUND_STRING, align: "left", wordWrap: true, wordWrapWidth: 360 }, 407, 142, 0, 0);
            currentObject.backToTitleButton = displaySpriteButtonOnScreen(currentObject, currentObject.backToTitleButton, 'howToPlay_backToTitleButton', 'howToPlay_backToTitleButton_inv', BabyTrader.Title.removeSubMenu, 400, 532);
        }

        static displayCreditScreen(currentObject) {
            var creditTexts = [
                { text: "developed by", size: 16, y: 177 },
                { text: "Jong Seong Lee", size: 40, y: 204 },
                { text: "github.com/jsl87/baby-trader", size: 14, y: 231 },
                { text: "game framework engine", size: 16, y: 272 },
                { text: "phaserjs", size: 30, y: 296 },
                { text: "phaser.io", size: 14, y: 321 },
                { text: "background mucis", size: 16, y: 362 },
                { text: "rengoku teien", size: 30, y: 386 },
                { text: "rengoku-teien.com", size: 14, y: 411 }
            ];

            currentObject.creditTexts = new Array();

            currentObject.overlay = displaySolidBackground(currentObject.game, currentObject.overlay, BabyTrader.Const.GOAL_BACKGROUND, 1);
            currentObject.subMenuTitle = displaySpriteOnScreen(currentObject.game, currentObject.subMenuTitle, 'credits_title', 400, 100);

            creditTexts.forEach(function (value, index, array) {
                currentObject.creditTexts.push(displayTextOnScreen(currentObject.game, currentObject.creditTexts[index], creditTexts[index].text.toUpperCase(), BabyTrader.Title.getCreditScreenTextStyle(creditTexts[index].size), currentObject.game.world.centerX, creditTexts[index].y));
                //currentObject.howToPlayText = displayTextOnScreen(currentObject.game, currentObject.howToPlayText, explainText, { font: "400 12px Work Sans", fill: Const.PROLOGUE_BACKGROUND_STRING, align: "left", wordWrap: true, wordWrapWidth: 350 }, 417, 152, 0, 0);
            });

            currentObject.backToTitleButton = displaySpriteButtonOnScreen(currentObject, currentObject.backToTitleButton, 'credits_backToTitleButton', 'credits_backToTitleButton_inv', BabyTrader.Title.removeSubMenu, 400, 500);
        }

        static getCreditScreenTextStyle(size: number) {
            return { font: "900 " + size + "px Work Sans", fill: BabyTrader.Const.TITLE_CREDITSTRINGCOLOR_STRING, align: "center" };
        }

        static removeSubMenu(currentObject) {
            if (currentObject.overlay) {
                currentObject.overlay.destroy();
            }
            if (currentObject.subMenuTitle) {
                currentObject.subMenuTitle.destroy();
            }
            if (currentObject.screenExample) {
                currentObject.screenExample.destroy();
            }
            if (currentObject.howToPlayText) {
                currentObject.howToPlayText.destroy();
            }
            if (currentObject.backToTitleButton) {
                currentObject.backToTitleButton.destroy();
            }
            if (currentObject.creditTexts) {
                currentObject.creditTexts.forEach(function (value, index, array) {
                    value.destroy();
                });
            }
        }
    }
} 