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
                return this.color_lightGray_str;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "PROLOGUE_BACKGROUND", {
            get: function () {
                return this.color_darkGray_str;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "TEMPLATE_BACKGROUND", {
            get: function () {
                return this.color_medGray_str;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "GOAL_BACKGROUND", {
            get: function () {
                return this.color_lightGray_hex;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "BOOT_BACKGROUND", {
            get: function () {
                return this.color_lightGray_str;
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
        Object.defineProperty(Const, "BITMAP_FONT", {
            get: function () {
                return 'carrier_command';
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "GAMEMODE_GOAL", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "GAMEMODE_PLAY", {
            get: function () {
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "GAMEMODE_RESULT", {
            get: function () {
                return 2;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "CHEATGAUGE_MAX", {
            get: function () {
                return 190;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "YELLOWCOLOR", {
            get: function () {
                return 0xffff00;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "GREENCOLOR", {
            get: function () {
                return 0x35eb35;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Const, "GREENCOLOR_STRING", {
            get: function () {
                return "#35eb35";
            },
            enumerable: true,
            configurable: true
        });
        ;
        Const.color_lightGray_str = "#afb3b6";
        Const.color_darkGray_str = "#2f3a42";
        Const.color_medGray_str = "#637079";
        Const.color_lightGray_hex = 0xafb3b6;
        return Const;
    })();
    BabyTrader.Const = Const;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=const.js.map