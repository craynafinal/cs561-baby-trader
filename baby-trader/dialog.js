/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var BabyTrader;
(function (BabyTrader) {
    var Dialog = (function () {
        function Dialog() {
        }
        Object.defineProperty(Dialog, "prologue", {
            get: function () {
                return [
                    "Welcome to my shop.",
                    "Please let me introduce my self.",
                    "I am the Baby Trader.",
                    "It is my honer to grant your wish."
                ];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Dialog.startDialog = function (game, dialogLocation, dialogContent) {
            this.game = game;
            this.dialogLocation = dialogLocation;
            this.dialogContent = dialogContent;
            this.dialogIndex = -1;
            this.nextLine();
            return dialogLocation;
        };
        Dialog.nextLine = function () {
            this.dialogIndex++;
            if (this.dialogIndex < this.dialogContent.length) {
                this.dialogLine = '';
                this.game.time.events.repeat(80, this.dialogContent[this.dialogIndex].length + 1, this.updateLine, this);
            }
        };
        Dialog.updateLine = function () {
            if (this.dialogLine.length < this.dialogContent[this.dialogIndex].length) {
                this.dialogLine = this.dialogContent[this.dialogIndex].substr(0, this.dialogLine.length + 1);
                this.dialogLocation.setText(this.dialogLine.toUpperCase());
            }
            else {
                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
            }
        };
        Dialog.game = null;
        Dialog.dialogLocation = null;
        Dialog.dialogContent = null;
        Dialog.dialogIndex = -1;
        Dialog.dialogLine = '';
        return Dialog;
    })();
    BabyTrader.Dialog = Dialog;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=dialog.js.map