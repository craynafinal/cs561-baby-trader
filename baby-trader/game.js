/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BabyTrader;
(function (BabyTrader) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
        }
        Play.prototype.preload = function () {
            this.game.load.image('preloadIcon', 'assets/graphics/preloader.gif');
        };
        Play.prototype.create = function () {
            this.game.state.start("preload");
        };
        Play.prototype.update = function () {
        };
        return Play;
    })(Phaser.State);
    BabyTrader.Play = Play;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=game.js.map