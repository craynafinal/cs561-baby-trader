/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Const {

        private static color_lightGray_str = "#afb3b6";
        private static color_darkGray_str = "#2f3a42";
        private static color_medGray_str = "#637079";
        private static color_lightGray_hex = 0xafb3b6;
        
        public static get TITLE_BACKGROUND(): string {
            return this.color_lightGray_str;
        };

        public static get PROLOGUE_BACKGROUND(): string {
            return this.color_darkGray_str;
        };

        public static get TEMPLATE_BACKGROUND(): string {
            return this.color_medGray_str;
        };

        public static get GOAL_BACKGROUND(): number {
            return this.color_lightGray_hex;
        };

        public static get BOOT_BACKGROUND(): string {
            return this.color_lightGray_str;
        };

        public static get GAMESCREEN_WIDTH(): number {
            return 800;
        };

        public static get GAMESCREEN_HEIGHT(): number {
            return 600;
        };

        public static get BITMAP_FONT(): string {
            return 'carrier_command';
        };

        public static get GAMEMODE_GOAL(): number {
            return 0;
        };

        public static get GAMEMODE_PLAY(): number {
            return 1;
        };

        public static get GAMEMODE_RESULT(): number {
            return 2;
        };

        public static get CHEATGAUGE_MAX(): number {
            return 190;
        };

        public static get YELLOWCOLOR(): number {
            return 0xffff00;
        };

        public static get GREENCOLOR(): number {
            return 0x35eb35;
        };

        public static get GREENCOLOR_STRING(): string {
            return "#35eb35";
        };

        public static get TEXTWHITEGRAYCOLOR_STRING(): string {
            return "#d4dbe1";
        };
    }
} 