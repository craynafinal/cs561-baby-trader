/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Play extends Phaser.State {
        constructor() {
            super();
        }

        player = null;
        player_isHorizontal = true;
        player_isLeft = false;
        player_isUp = false;
        map = null;
        backgroundLayer = null;
        blockedLayer = null;
        cursors = null;
        speed = 250;
        coins = null;
        key_pause = null;
       
        preload() {
        }

        create() {
            this.tileMapSetup('tileMap_default', 'tileMap_default_sprite', 'tiles_spritesheet', 'backgroundLayer', 'blockedLayer');
            //this.playerSetup('sprite_player_horizontal', 0, 0, 0);
            this.playerSetup('spriteSheet_player_animation_horizontal', 0, 0, 0);
            this.playerSetupAnimation();

            this.createCoins();

            this.setupKeyboardHotkeys();

            // Input Setup
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.blockedLayer);
            this.playerControl();

            this.game.physics.arcade.overlap(this.player, this.coins, this.collect, null, this);
        }
        //**********************************************************************************************************

        setupKeyboardHotkeys() {
            this.key_pause = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
            this.key_pause.onDown.add(this.pauseOrResumeGame, this);
            this.game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ESC);
        }

        pauseOrResumeGame() {
            if (!this.game.paused) {
                this.game.paused = true;
            } else {
                this.game.paused = false;
            }
        }

        collect() {
            var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "- phaser -\nclick to remove", { font: "65px Arial", fill: "#ff0044", align: "center" });

            
            //text.anchor.setTo(0.5, 0.5);

            //this.game.input.onDown.addOnce(null, this);
        }
        createCoins() {

            this.coins = this.game.add.group();
            this.coins.enableBody = true;

            var result = this.findObjectsByType('coin', this.map, 'objectsLayer');
            result.forEach(function (element) {
                this.createFromTiledObject(element, this.coins);
            }, this);

        }

        findObjectsByType(type, map, layerName: string) {
            var result = new Array();
            map.objects[layerName].forEach(function (element) {
                if (element.properties.type === type) {
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            });
            return result;
        }

        createFromTiledObject(element, group) {
           var sprite = group.create(element.x, element.y, element.properties.sprite);
 
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        }

        playerControl() {
            if (this.cursors.up.isDown) {
                this.player.body.velocity.y = -this.speed;
            }
            else if (this.cursors.down.isDown) {
                this.player.body.velocity.y = this.speed;
            }
            else {
                this.player.body.velocity.y = 0;
            }

            if (this.cursors.left.isDown) {
                this.switchPlayerDirection(this.player_isLeft);
                this.player_isLeft = true;
                this.player.body.velocity.x = -this.speed;
                this.playerPlayAnimation('walk', 20);
            }
            else if (this.cursors.right.isDown) {
                this.switchPlayerDirection(this.player_isLeft);
                this.player_isLeft = false;
                this.player.body.velocity.x = this.speed;
                this.playerPlayAnimation('walk', 20);
            }
            else {
                this.player.body.velocity.x = 0;
                this.player.animations.stop();
            }
        }

        switchPlayerDirection(directionCheck: boolean) {
            if (!directionCheck) {
                this.player.scale.x = 1;
            } else {
                this.player.scale.x = -1;
            }
        }

        switchPlayerSprite(sprite: string, directionCheck: boolean, horizontalCheck: boolean) {
            //this.player.loadTexture(sprite);
        }

        tileMapSetup(tileMap: string, tileSprite: string, tileSpriteName: string, backgroundLayer: string, blockedLayer: string) {
            this.map = this.game.add.tilemap(tileMap);
            this.map.addTilesetImage(tileSpriteName, tileSprite);

            this.backgroundLayer = this.map.createLayer(backgroundLayer);
            this.blockedLayer = this.map.createLayer(blockedLayer);
            this.map.setCollisionBetween(1, 100000, true, blockedLayer);

            this.backgroundLayer.resizeWorld();
        }
        
        playerPlayAnimation(animation: string, frames: number) {
            this.player.animations.play('walk', 20, true);
        }

        playerSetupAnimation() {
            this.player.animations.add('walk'); // 'walk', [0,1,2,3,4,5...] => sprite number to be included in the animation
        }

        playerSetup(player: string, x: number, y: number, gravity: number) {
            this.player = this.game.add.sprite(x, y, player);
            this.game.physics.arcade.enable(this.player);
            if (gravity > 0) {
                this.player.body.gravity.y = gravity;
            }
            this.game.camera.follow(this.player);
            this.player.anchor.setTo(.5);
            this.player.scale.x = 1;
        }
    }
} 