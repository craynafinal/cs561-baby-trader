/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/

module BabyTrader {
    export class Customer {
        constructor() {
            this.attributes = insertAttributeToArrayAsSet(this.attributes, BabyTrader.Customer.attributes_max);
            this.sprite = BabyTrader.Customer.customerSprites[getRandomNumber(BabyTrader.Customer.customerSprites.length)];
        }

        private static attributes_max = 3;
        private attributes: Attribute[] = new Array();
        private sprite = null;
        private static greetStrings = [
            "Hello, would you show me a baby who",
            "Hey, do you have a baby who",
            "Hi there, can I get a baby who",
            "What's up? Could you show me a baby who"
        ];
        private static rejectStrings = [
            "Are you listening to me?",
            "Did you hear what I said?",
            "That is not a baby that I want.",
            "You want to do business or what?",
            "You kidding me?"
        ];
        private static rejectRepeatStrings = [
            "I said,",
            "Telling you again,",
            "Do not make me repeat again,"
        ];
        private static acceptStrings = [
            "Thank you, this baby is great!",
            "I think I won't find a better baby.",
            "I will take the baby. Thanks.",
            "You have some nice goods, I like it."
        ];
        private static customerSprites = [
            'customers_001'
        ];

        getSprite() {
            return this.sprite;
        }

        greet() {
            var returnString = BabyTrader.Customer.greetStrings[getRandomNumber(BabyTrader.Customer.greetStrings.length)] + BabyTrader.Customer.getSummedAttributeStrings(this.attributes, '?');
            return [returnString];
        }

        static getSummedAttributeStrings(attributes, lastCharacter: string) {
            var returnString = '';

            attributes.forEach(function (attribute, index, array) {
                returnString = returnString + " " + attribute.getDescription();
                if (index < array.length - 1) {
                    returnString = returnString + ",";
                } else {
                    returnString = returnString + lastCharacter;
                }
            });
            return returnString;
        }

        reject() {
            return [BabyTrader.Customer.rejectStrings[getRandomNumber(BabyTrader.Customer.rejectStrings.length)], BabyTrader.Customer.rejectRepeatStrings[getRandomNumber(BabyTrader.Customer.rejectRepeatStrings.length)] + BabyTrader.Customer.getSummedAttributeStrings(this.attributes, '?')];
        }

        accept() {
            return [BabyTrader.Customer.acceptStrings[getRandomNumber(BabyTrader.Customer.acceptStrings.length)]];
        }

        checkElementAvailability(babyAttribute): boolean {
            var index = 0;
            var check = false;

            while (!check && (index < this.attributes.length - 1)) {
                if (this.attributes[index].getName() == babyAttribute.getName()) {
                    console.log(this.attributes[index].getName() + " " + babyAttribute.getName());
                    check = true;
                } else {
                    index++;
                }
            }

            return check;
        }

        checkElementsAvailability(babyAttributes): boolean {
            var index = 0;
            var check = false;

            while (!check && (index < babyAttributes.length - 1)) {
                if (this.checkElementAvailability(babyAttributes[index])) {
                    check = true;
                } else {
                    index++;
                }
            }

            return check;

            /*var returnCheck = false;
            var eachCheck = false;
            var index = 0;
            var babyIndex = 0;

            while (index < this.attributes.length) {
                while (!eachCheck && (babyIndex < babyAttributes.length)) {
                    if (this.attributes[index] == babyAttributes[babyIndex]) {
                        eachCheck = true;
                    }
                    babyIndex++;
                }

                if (eachCheck) {
                    index++;
                    babyIndex = 0;
                } else {
                    index = this.attributes.length + 1;
                }
            }

            return returnCheck;*/
        }
    }
}