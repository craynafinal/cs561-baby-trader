/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Dialog {
        public static get prologue(): string[] {
            return [
                "Welcome to my shop.",
                "Welcome to my shop.",
                "Please let me introduce my self.",
                "I am the Baby Trader.",
                "It is my honer to grant your wish.",
                "Have you ever thought about ",
                "03:45, November 4th, 2014",
                "somewhere in the north pacific",
                "mission control bravo ..."
            ];
        };

        private static game = null;
        private static dialogLocation = null;
        private static dialogContent = null;
        private static dialogIndex = 0;
        private static dialogLine = '';

        public static startDialog(game, dialogLocation, dialogContent) {
            this.game = game;
            this.dialogLocation = dialogLocation;
            this.dialogContent = dialogContent;
            this.nextLine();
        }

        private static nextLine() {
            this.dialogIndex++;

            if (this.dialogIndex < this.dialogContent.length) {
                this.dialogLine = '';
                this.game.time.events.repeat(80, this.dialogContent[this.dialogIndex].length + 1, this.updateLine, this);
            }
        }

        private static updateLine() {
            if (this.dialogLine.length < this.dialogContent[this.dialogIndex].length) {
                this.dialogLine = this.dialogContent[this.dialogIndex].substr(0, this.dialogLine.length + 1);
                this.dialogLocation.setText(this.dialogLine);
            }
            else {
                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
            }
        }
    }
} 