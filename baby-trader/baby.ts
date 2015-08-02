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
            this.gender = (getRandomNumber(1) > 0) ? true : false;

            if (this.gender) {
                this.name = BabyTrader.Baby.names_male[getRandomNumber(BabyTrader.Baby.names_male.length)];
                this.sprite = BabyTrader.Baby.sprites_male[getRandomNumber(BabyTrader.Baby.sprites_male.length)];
            } else {
                this.name = BabyTrader.Baby.names_female[getRandomNumber(BabyTrader.Baby.names_female.length)];
                this.sprite = BabyTrader.Baby.sprites_female[getRandomNumber(BabyTrader.Baby.sprites_female.length)];
            }

            this.age = getRandomNumber(BabyTrader.Baby.age_max);
            this.price = getRandomNumber(BabyTrader.Baby.price_max);
            this.attributes = new Array();
            /*
            var i = 0;

            while (i < BabyTrader.Baby.attributes_max) {
                var temp = new BabyTrader.Attribute();
                var check = false;
                var j = 0;

                while (!check && (j < this.attributes.length)) {
                    if (this.attributes[j] == temp) {
                        check = true;
                    }
                }

                if (check) {
                    this.attributes.push(temp);
                    i++;
                }
            }*/
        }

        private name: string = '';
        private gender: boolean; // true: male, false: female
        private sprite = null;
        private age: number = 0;
        private price: number = 0;
        private attributes: Attribute[];
        private static attributes_max = 5;
        private static names_male = ['John', 'Jack', 'Jacob', 'Brandon', 'Brad', 'Harry', 'Ken', 'Andy', 'Doug', 'Chris', 'Scott'];
        private static names_female = ['Jamie', 'Rachel', 'Elizabeth', 'Clementine', 'Amy', 'Maria', 'Katherine', 'Tess', 'Aurora'];
        private static sprites_male = ['babies_male_001'];
        private static sprites_female = ['babies_male_001'];
        private static price_max = 100;
        private static age_max = 5;

        getName() {
            return this.name;
        }

        getAge() {
            return this.age;
        }

        getSprite() {
            return this.sprite;
        }

        getAttributes() {
            return this.attributes;
        }
    }
}