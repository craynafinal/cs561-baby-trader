/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var global_bgm = null;
function playBackgroundSound(game, music) {
    global_bgm = game.add.audio(music);
    global_bgm.loop = true;
    global_bgm.play();
}
function stopBackgroundSound() {
    global_bgm.stop();
}
//# sourceMappingURL=global.js.map