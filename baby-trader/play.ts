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
        private overlay = null;
        private pauseState: boolean = false;
        private sprite_template = null;
        private sprite_goal = null;
        private button_arrowLeft = null;
        private button_arrowRight = null;
        private button_business = null;
        private button_charge = null;
        private button_pause = null;
        private button_talent = null;
        private button_goalStart = null;
        private button_goalBack = null;
        private gameLevel: number = 0;
        private gameTime: number = 0;
        private money_current: number = 0;
        private money_goal: number = 0;
        private text_money = null;
        private text_time = null;

        preload() {
        }

        create() {
            // setup bgm
            playBackgroundSound(this.game, 'bgm_play');

            // setup keys
            setupKeyboardHotkeys(this.game, this.key_pause, Phaser.Keyboard.ESC, this.pauseOrResumeGame, this);

            // setup background color
            this.game.stage.backgroundColor = Const.TEMPLATE_BACKGROUND;

            // template
            this.sprite_template = displaySpriteOnScreen(this.game, this.sprite_template, 'template_template', 0, 0, 0, 0);

            // button setups
            this.button_arrowLeft = displaySpriteButtonOnScreen(this, this.button_arrowLeft, 'template_arrowLeft', 'template_arrowLeft_inv', null, 543, 380);
            this.button_arrowRight = displaySpriteButtonOnScreen(this, this.button_arrowRight, 'template_arrowRight', 'template_arrowRight_inv', null, 762, 380);
            this.button_business = displaySpriteButtonOnScreen(this, this.button_business, 'template_businessButton', 'template_businessButton_inv', null, 693, 536);
            this.button_charge = displaySpriteButtonOnScreen(this, this.button_charge, 'template_chargeButton', 'template_chargeButton_inv', null, 553, 562);
            this.button_pause = displaySpriteButtonOnScreen(this, this.button_pause, 'template_pauseButton', 'template_pauseButton_inv', null, 693, 466);
            this.button_talent = displaySpriteButtonOnScreen(this, this.button_talent, 'template_talentButton', 'template_talentButton_inv', null, 487, 562);

            this.setupTimeAndMoney();
            this.displayGoalScreen();
        }

        update() {
            this.updateText();
        }
        
        setupTimeAndMoney() {
            this.money_goal = (this.gameLevel * 20) + 100;
            this.gameTime = 60 + (this.gameLevel * 10);
            this.gameLevel++;
        }
        
        pauseOrResumeGame() {
            if (!this.overlay) {
                this.pauseState = true;
                this.pauseGame();
            } else {
                this.pauseState = false;
                this.resumeGame();
            }
        }

        resumeGame() {
            this.overlay.destroy();
            this.overlay = null;
        }

        pauseGame() {
            displaySolidBackground(this.game, this.overlay, 0x000000, .7);
        }

        startGame() {

        }

        displayGoalScreen() {
            this.overlay = displaySolidBackground(this.game, this.overlay, BabyTrader.Const.BEGIN_BACKGROUND, 1);
            this.sprite_goal = displaySpriteOnScreen(this.game, this.sprite_goal, 'goalScreen_panel', 401, 250);
            
            var goBackToTitleFunction = function (currentObject) {
                currentObject.game.state.start('title');
            };

            var removeDisplayGoalScreenFunction = function (currentObject) {
                currentObject.overlay.destroy();
                currentObject.sprite_goal.destroy();
                currentObject.button_goalStart.destroy();
                currentObject.button_goalBack.destroy();
                currentObject.text_money.destroy();
                currentObject.text_time.destroy();
            };

            this.button_goalStart = displaySpriteButtonOnScreen(this, this.button_goalStart, 'goalScreen_startButton', 'goalScreen_startButton_inv', removeDisplayGoalScreenFunction, 526, 452);
            this.button_goalBack = displaySpriteButtonOnScreen(this, this.button_goalBack, 'goalScreen_backToTitleButton', 'goalScreen_backToTitleButton_inv', goBackToTitleFunction, 263, 452);

            var fontStyle = { font: "900 26px Sarpanch", fill: "#35eb35", align: "right" };

            this.text_money = displayTextOnScreen(this.game, this.text_money, '', fontStyle, 564, 246, 1, 0);
            this.text_time = displayTextOnScreen(this.game, this.text_time, '', fontStyle, 564, 312, 1, 0);
        }

        updateText() {
            if (this.text_money) {
                this.text_money.setText("$" + String(this.money_goal - this.money_current));
            }

            if (this.text_time) {
                var hour = Math.floor(this.gameTime / 60);
                var minute = this.gameTime;
                var format = "";

                if (hour > 0) {
                    minute = this.gameTime - (hour * 60);
                }

                if (minute <= 9) {
                    format = "0";
                }

                this.text_time.setText(String(hour) + ":" + format + minute);
            }
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