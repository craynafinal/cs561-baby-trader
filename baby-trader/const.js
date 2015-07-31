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
                return this.color_lightGray;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "PROLOGUE_BACKGROUND", {
            get: function () {
                return this.color_darkGray;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "TEMPLATE_BACKGROUND", {
            get: function () {
                return this.color_medGray;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "BEGIN_BACKGROUND", {
            get: function () {
                return this.color_lightGray;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "BOOT_BACKGROUND", {
            get: function () {
                return this.color_lightGray;
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
        Object.defineProperty(Const, "FADE_COLOR", {
            get: function () {
                return 0x2f3a42;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "BITMAP_FONT", {
            get: function () {
                return 'carrier_command';
            },
            enumerable: true,
            configurable: true
        });
        ;
        Const.color_lightGray = "#afb3b6";
        Const.color_darkGray = "#2f3a42";
        Const.color_medGray = "#637079";
        return Const;
    })();
    BabyTrader.Const = Const;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=const.js.map