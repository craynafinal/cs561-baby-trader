/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var BabyTrader;
(function (BabyTrader) {
    var Const = (function () {
        function Const() {
        }
        Object.defineProperty(Const, "TITLE_BACKGROUND", {
            get: function () {
                return "#b62b1d";
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "PROLOGUE_BACKGROUND", {
            get: function () {
                return "#000000";
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "GAMESCREEN_WIDTH", {
            get: function () {
                return 800;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "GAMESCREEN_HEIGHT", {
            get: function () {
                return 600;
            },
            enumerable: true,
            configurable: true
        });
        ;
        return Const;
    })();
    BabyTrader.Const = Const;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=const.js.map