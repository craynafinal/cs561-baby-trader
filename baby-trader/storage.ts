/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Storage {
        public static saveGame(gameObject) {
            localStorage.setItem('game', JSON.stringify(gameObject));
        }

        public static loadGame() {
            return JSON.parse(localStorage.getItem('game'));
        }
    }
} 