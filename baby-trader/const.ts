/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Const {

        private static color_lightGray = "#afb3b6";
        private static color_darkGray = "#2f3a42";
        private static color_medGray = "#637079";

        public static get TITLE_BACKGROUND(): string {
            return this.color_lightGray;
        };

        public static get PROLOGUE_BACKGROUND(): string {
            return this.color_darkGray;
        };

        public static get TEMPLATE_BACKGROUND(): string {
            return this.color_medGray;
        };

        public static get BEGIN_BACKGROUND(): string {
            return this.color_lightGray;
        };

        public static get BOOT_BACKGROUND(): string {
            return this.color_lightGray;
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

        public static get BITMAP_FONT(): string {
            return 'carrier_command';
        };
    }
} 