/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var globalBgm = null;
function playBackgroundSound(game, music) {
    if (globalBgm != null) {
        stopBackgroundSound();
    }
    globalBgm = game.add.audio(music);
    globalBgm.loop = true;
    //globalBgm.play();
}
function stopBackgroundSound() {
    globalBgm.stop();
    globalBgm = null;
}
function insertAttributeToArrayAsSet(array, maxNumberToAdd) {
    var i = 0;
    while (i < maxNumberToAdd) {
        var temp = new BabyTrader.Attribute();
        var check = false;
        var j = 0;
        while (!check && (j < array.length)) {
            if (array[j] == temp) {
                check = true;
            }
            j++;
        }
        if (!check) {
            array.push(temp);
            i++;
        }
    }
    return array;
}
function setupKeyboardHotkeys(gameVariable, keyVariable, keyboardKey, keyMethod, keyThis) {
    keyVariable = gameVariable.input.keyboard.addKey(keyboardKey);
    keyVariable.onDown.add(keyMethod, keyThis);
    gameVariable.input.keyboard.removeKeyCapture(keyboardKey);
}
function displayBitmapTextOnScreen(game, textObject, text, bitMapFont, fontSize, x, y, anchorX, anchorY) {
    if (anchorX === void 0) { anchorX = .5; }
    if (anchorY === void 0) { anchorY = .5; }
    textObject = game.add.bitmapText(x, y, bitMapFont, text, fontSize);
    textObject.anchor.setTo(anchorX, anchorY);
    return textObject;
}
function displayTextOnScreen(game, textObject, text, fontStyle, x, y, anchorX, anchorY) {
    if (anchorX === void 0) { anchorX = .5; }
    if (anchorY === void 0) { anchorY = .5; }
    textObject = game.add.text(x, y, text, fontStyle);
    textObject.anchor.setTo(anchorX, anchorY);
    return textObject;
}
function displayTextButtonOnScreen(currentObject, textObject, text, fontStyle, upMethod, x, y, anchorX, anchorY) {
    textObject = displayTextOnScreen(currentObject.game, textObject, text, fontStyle, x, y, anchorX, anchorY);
    textObject.inputEnabled = true;
    textObject.input.useHandCursor = true;
    if (upMethod) {
        textObject.events.onInputUp.add(function () {
            upMethod(currentObject);
        });
    }
    return textObject;
}
function displaySpriteOnScreen(game, spriteObject, spriteName, x, y, anchorX, anchorY) {
    if (anchorX === void 0) { anchorX = .5; }
    if (anchorY === void 0) { anchorY = .5; }
    spriteObject = game.add.sprite(x, y, spriteName);
    spriteObject.anchor.setTo(anchorX, anchorY);
    return spriteObject;
}
function displaySpriteButtonOnScreen(currentObject, spriteObject, spriteName, spriteInvName, upMethod, x, y, anchorX, anchorY) {
    spriteObject = displaySpriteOnScreen(currentObject.game, spriteObject, spriteName, x, y, anchorX, anchorY);
    spriteObject.inputEnabled = true;
    spriteObject.input.useHandCursor = true;
    spriteObject.events.onInputDown.add(function () {
        spriteObject.loadTexture(spriteInvName);
    });
    spriteObject.events.onInputUp.add(function () {
        spriteObject.loadTexture(spriteName);
        if (upMethod) {
            upMethod(currentObject);
        }
    });
    return spriteObject;
}
function addTweenToGame(game, sprite, opacity, time) {
    game.add.tween(sprite).to({ alpha: opacity }, time, Phaser.Easing.Linear.None, true);
}
function addFadeTweenToSprite(game, sprite, startOpacity, endOpacity, time) {
    sprite.alpha = startOpacity;
    addTweenToGame(game, sprite, endOpacity, time);
}
function displaySolidBackground(game, graphicObject, color, opacity) {
    return displaySolidRectangular(game, graphicObject, color, opacity, BabyTrader.Const.GAMESCREEN_WIDTH, BabyTrader.Const.GAMESCREEN_HEIGHT, 0, 0);
}
function displaySolidRectangular(game, graphicObject, color, opacity, width, height, x, y) {
    graphicObject = game.add.graphics(0, 0);
    graphicObject.beginFill(color, opacity);
    graphicObject.drawRect(x, y, width, height);
    graphicObject.endFill();
    graphicObject.inputEnabled = true;
    return graphicObject;
}
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
//# sourceMappingURL=global.js.map