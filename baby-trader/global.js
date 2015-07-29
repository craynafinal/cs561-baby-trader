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
function setupKeyboardHotkeys(gameVariable, keyVariable, keyboardKey, keyMethod, keyThis) {
    keyVariable = gameVariable.input.keyboard.addKey(keyboardKey);
    keyVariable.onDown.add(keyMethod, keyThis);
    gameVariable.input.keyboard.removeKeyCapture(keyboardKey);
}
function displayTextOnScreen(game, textObject, text, fontStyle, x, y, anchorX, anchorY) {
    if (anchorX === void 0) { anchorX = .5; }
    if (anchorY === void 0) { anchorY = .5; }
    textObject = game.add.text(x, y, text, fontStyle);
    textObject.anchor.setTo(anchorX, anchorY);
    return textObject;
}
function displayTextButtonOnScreen(game, textObject, text, fontStyle, upMethod, x, y, anchorX, anchorY) {
    textObject = displayTextOnScreen(game, textObject, text, fontStyle, x, y, anchorX, anchorY);
    textObject.inputEnabled = true;
    textObject.input.useHandCursor = true;
    textObject.events.onInputUp.add(function () {
        upMethod(game);
    });
}
function displaySpriteOnScreen(game, spriteObject, spriteName, x, y, anchorX, anchorY) {
    if (anchorX === void 0) { anchorX = .5; }
    if (anchorY === void 0) { anchorY = .5; }
    spriteObject = game.add.sprite(x, y, spriteName);
    spriteObject.anchor.setTo(anchorX, anchorY);
    return spriteObject;
}
function displaySpriteButtonOnScreen(game, spriteOjbect, spriteName, spriteInvName, upMethod, x, y, anchorX, anchorY) {
    spriteOjbect = displaySpriteOnScreen(game, spriteOjbect, spriteName, x, y, anchorX, anchorY);
    spriteOjbect.inputEnabled = true;
    spriteOjbect.input.useHandCursor = true;
    spriteOjbect.events.onInputDown.add(function () {
        spriteOjbect.loadTexture(spriteInvName);
    });
    spriteOjbect.events.onInputUp.add(function () {
        spriteOjbect.loadTexture(spriteName);
        upMethod(game);
    });
}
function addTweenToGame(game, sprite, opacity, time) {
    game.add.tween(sprite).to({ alpha: opacity }, time, Phaser.Easing.Linear.None, true);
}
function addFadeTweenToSprite(game, sprite, startOpacity, endOpacity, time) {
    sprite.alpha = startOpacity;
    addTweenToGame(game, sprite, endOpacity, time);
}
function fadeScreen(game, fillColor, startOpacity, endOpacity, time) {
    var pauseOverlay = game.add.graphics(0, 0);
    pauseOverlay.beginFill(0x000000, startOpacity);
    pauseOverlay.drawRect(0, 0, BabyTrader.Const.GAMESCREEN_WIDTH, BabyTrader.Const.GAMESCREEN_HEIGHT);
    pauseOverlay.endFill();
    addTweenToGame(game, pauseOverlay, endOpacity, time);
    pauseOverlay.destroy();
}
//# sourceMappingURL=global.js.map