/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var BabyTrader;
(function (BabyTrader) {
    var Baby = (function () {
        function Baby() {
            this.name = '';
            this.sprite = null;
            this.age = 0;
            this.price = 0;
            // set gender first
            this.gender = (getRandomNumber(1) > 0) ? true : false;
            if (this.gender) {
                this.name = BabyTrader.Baby.names_male[getRandomNumber(BabyTrader.Baby.names_male.length)];
                this.sprite = BabyTrader.Baby.sprites_male[getRandomNumber(BabyTrader.Baby.sprites_male.length)];
            }
            else {
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
        Baby.prototype.getName = function () {
            return this.name;
        };
        Baby.prototype.getAge = function () {
            return this.age;
        };
        Baby.prototype.getSprite = function () {
            return this.sprite;
        };
        Baby.prototype.getAttributes = function () {
            return this.attributes;
        };
        Baby.attributes_max = 5;
        Baby.names_male = ['John', 'Jack', 'Jacob', 'Brandon', 'Brad', 'Harry', 'Ken', 'Andy', 'Doug', 'Chris', 'Scott'];
        Baby.names_female = ['Jamie', 'Rachel', 'Elizabeth', 'Clementine', 'Amy', 'Maria', 'Katherine', 'Tess', 'Aurora'];
        Baby.sprites_male = ['babies_male_001'];
        Baby.sprites_female = ['babies_male_001'];
        Baby.price_max = 100;
        Baby.age_max = 5;
        return Baby;
    })();
    BabyTrader.Baby = Baby;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=baby.js.map