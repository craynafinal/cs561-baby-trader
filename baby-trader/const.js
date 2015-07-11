/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var Const;
(function (Const) {
    var Color = (function () {
        function Color() {
        }
        Object.defineProperty(Color, "TITLE_BACKGROUND", {
            get: function () {
                return "#b62b1d";
            },
            enumerable: true,
            configurable: true
        });
        ;
        return Color;
    })();
    Const.Color = Color;
})(Const || (Const = {}));
//# sourceMappingURL=const.js.map