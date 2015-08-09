/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Baby {
        constructor() {
            // set gender first
            this.gender = (getRandomNumber(2) >= 1) ? true : false;

            if (this.gender) {
                this.name = BabyTrader.Baby.names_male[getRandomNumber(BabyTrader.Baby.names_male.length)];
                this.sprite = BabyTrader.Baby.sprites_male[getRandomNumber(BabyTrader.Baby.sprites_male.length)];
            } else {
                this.name = BabyTrader.Baby.names_female[getRandomNumber(BabyTrader.Baby.names_female.length)];
                this.sprite = BabyTrader.Baby.sprites_female[getRandomNumber(BabyTrader.Baby.sprites_female.length)];
            }

            this.month = getRandomNumber(BabyTrader.Baby.month_max) + 1;
            this.price = getRandomNumber(BabyTrader.Baby.price_max);
            if (this.price <= 0) {
                this.price = 1;
            }
            this.attributes = new Array();
            this.attributes = insertAttributeToArrayAsSet(this.attributes, BabyTrader.Baby.attributes_max);
        }

        private name: string = '';
        private gender: boolean; // true: male, false: female
        private sprite = null;
        private month: number = 0;
        private price: number = 0;
        private attributes: Attribute[];
        private static attributes_max = 5;
        private static names_male = ['John', 'Jack', 'Jacob', 'Brandon', 'Brad', 'Harry', 'Ken', 'Andy', 'Doug', 'Chris', 'Scott'];
        private static names_female = ['Jamie', 'Rachel', 'Elizabeth', 'Clementine', 'Amy', 'Maria', 'Katherine', 'Tess', 'Aurora'];
        private static sprites_male = [
            'babies_male_001',
            'babies_male_002',
        ];
        private static sprites_female = [
            'babies_female_001',
            'babies_female_002',
        ];
        private static price_max = 100;
        private static month_max = 24;

        getPrice() {
            return this.price;
        }

        getName() {
            return this.name;
        }

        getMonth() {
            return this.month;
        }

        getSprite() {
            return this.sprite;
        }

        getAttributes() {
            return this.attributes;
        }
    }
}