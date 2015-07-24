/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Preload extends Phaser.State {

        constructor() {
            super();
        }

        ready: boolean;
        preloadIcon;

        preload() {
            this.preloadIcon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadIcon');
            this.preloadIcon.anchor.set(0.5, 0.5);

            this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.game.load.setPreloadSprite(this.preloadIcon);

            this.game.load.image('startPage_title', 'assets/sprites/startPage_title.png');
            this.game.load.image('startPage_babyTrader', 'assets/sprites/startPage_babyTrader.png');
            this.game.load.image('gamePlay_interface', 'assets/sprites/template_temp.png');

            this.game.load.audio('se_babyCrying', 'assets/sounds/se_babyCrying.wav');
            this.game.load.audio('bgm_pink65', 'assets/sounds/bgm_pink65.mp3');

            this.game.load.bitmapFont('carrier_command', 'assets/bitmapFonts/nokia.png', 'assets/bitmapFonts/nokia.xml');

            this.game.load.tilemap('tileMap_default', 'assets/tileMaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tileMap_default_sprite', 'assets/tiles/tiles_spritesheet.png');
            this.game.load.image('sprite_player_horizontal', 'assets/sprites/arrow_right_temp.png');
            this.game.load.image('sprite_player_up', 'assets/sprites/arrow_left_temp.png');
            this.game.load.image('sprite_player_bottom', 'assets/sprites/arrow_left_temp.png');

            this.load.image('goldCoin', 'assets/sprites/green_ball.png');
            this.game.load.spritesheet('spriteSheet_player_animation_horizontal', 'assets/spriteSheets/metalslug_mummy37x45.png', 37, 45, 18);
        }

        create() {
            this.preloadIcon.cropEnabled = false;
        }

        update() {
            if (!!this.ready) {
                this.game.state.start('title');
            }
        }

        onLoadComplete() {
            this.ready = true;
        }
    }
}