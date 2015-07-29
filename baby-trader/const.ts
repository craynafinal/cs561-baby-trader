/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Const {
        public static get TITLE_BACKGROUND(): string {
            return "#afb3b6";
        };

        public static get PROLOGUE_BACKGROUND(): string {
            return "#2f3a42";
        };

        public static get TEMPLATE_BACKGROUND(): string {
            return "#637079";
        };

        public static get BOOT_BACKGROUND(): string {
            return "#2f3a42";
        };

        public static get GAMESCREEN_WIDTH(): number {
            return 800;
        };

        public static get GAMESCREEN_HEIGHT(): number {
            return 600;
        };

        public static get FADE_COLOR() {
            return 0x2f3a42;
        };
    }
} 