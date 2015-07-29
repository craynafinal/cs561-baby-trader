/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Play extends Phaser.State {
        constructor() {
            super();
        }

        private key_pause = null;
        private pauseOverlay = null;
        private pauseState = false;
        private sprite_template = null;
        private button_arrowLeft = null;
        private button_arrowRight = null;
        private button_business = null;
        private button_charge = null;
        private button_pause = null;
        private button_talent = null;

        preload() {
        }

        create() {
            // setup keys
            setupKeyboardHotkeys(this.game, this.key_pause, Phaser.Keyboard.ESC, this.pauseOrResumeGame, this);

            // setup background color
            this.game.stage.backgroundColor = Const.TEMPLATE_BACKGROUND;

            // template
            this.sprite_template = displaySpriteOnScreen(this.game, this.sprite_template, 'template_template', 0, 0, 0, 0);

            // button setups
            this.button_arrowLeft = displaySpriteButtonOnScreen(this.game, this.button_arrowLeft, 'template_arrowLeft', 'template_arrowLeft_inv', null, 543, 380);
            this.button_arrowRight = displaySpriteButtonOnScreen(this.game, this.button_arrowRight, 'template_arrowRight', 'template_arrowRight_inv', null, 762, 380);
            this.button_business = displaySpriteButtonOnScreen(this.game, this.button_business, 'template_businessButton', 'template_businessButton_inv', null, 693, 536);
            this.button_charge = displaySpriteButtonOnScreen(this.game, this.button_charge, 'template_chargeButton', 'template_chargeButton_inv', null, 553, 562);
            this.button_pause = displaySpriteButtonOnScreen(this.game, this.button_pause, 'template_pauseButton', 'template_pauseButton_inv', null, 693, 466);
            this.button_talent = displaySpriteButtonOnScreen(this.game, this.button_talent, 'template_talentButton', 'template_talentButton_inv', null, 487, 562);
        }

        update() {
        }

        pauseOrResumeGame() {
            if (!this.pauseOverlay) {
                this.pauseState = true;
                this.pauseGame();
            } else {
                this.pauseState = false;
                this.resumeGame();
            }
        }

        resumeGame() {
            this.pauseOverlay.destroy();
            this.pauseOverlay = null;
        }

        pauseGame() {
            this.pauseOverlay = this.game.add.graphics(0, 0);
            this.pauseOverlay.beginFill(0x000000, 0.7);
            this.pauseOverlay.drawRect(0, 0, 800, 600);
            this.pauseOverlay.endFill();
            this.pauseOverlay.inputEnabled = true;
        }

        startDialog() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !this.pauseState) {
                console.log("activated");
                //this.game.input.enabled = false;
                //this.dialogLocation = this.game.add.text(0, 500, "", { font: "65px Arial", fill: "#ffffff", align: "center" });

                //Dialog.startDialog(this.game, this.dialogLocation, Dialog.d_0001);
                //this.game.input.enabled = true;
            }
        }
    }
} 