/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var BabyTrader;
(function (BabyTrader) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.saveGame = function (gameObject) {
            localStorage.setItem('game', JSON.stringify(gameObject));
        };
        Storage.loadGame = function () {
            return JSON.parse(localStorage.getItem('game'));
        };
        return Storage;
    })();
    BabyTrader.Storage = Storage;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=storage.js.map