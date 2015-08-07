/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var BabyTrader;
(function (BabyTrader) {
    var Customer = (function () {
        function Customer() {
            this.attributes = new Array();
            this.sprite = null;
            this.attributes = insertAttributeToArrayAsSet(this.attributes, BabyTrader.Customer.attributes_max);
            this.sprite = BabyTrader.Customer.customerSprites[getRandomNumber(BabyTrader.Customer.customerSprites.length)];
        }
        Customer.prototype.getAttributes = function () {
            return this.attributes;
        };
        Customer.prototype.getSprite = function () {
            return this.sprite;
        };
        Customer.prototype.greet = function () {
            var returnString = BabyTrader.Customer.greetStrings[getRandomNumber(BabyTrader.Customer.greetStrings.length)] + BabyTrader.Customer.getSummedAttributeStrings(this.attributes, '?');
            return [returnString];
        };
        Customer.getSummedAttributeStrings = function (attributes, lastCharacter) {
            var returnString = '';
            attributes.forEach(function (attribute, index, array) {
                var endCharacter = ',';
                var spacing = ' ';
                if (index >= array.length - 1) {
                    endCharacter = lastCharacter;
                    spacing = ' and ';
                }
                returnString = returnString + spacing + attribute.getDescription() + endCharacter;
            });
            return returnString;
        };
        Customer.prototype.reject = function () {
            return [BabyTrader.Customer.rejectStrings[getRandomNumber(BabyTrader.Customer.rejectStrings.length)], BabyTrader.Customer.rejectRepeatStrings[getRandomNumber(BabyTrader.Customer.rejectRepeatStrings.length)] + BabyTrader.Customer.getSummedAttributeStrings(this.attributes, '...')];
        };
        Customer.prototype.accept = function () {
            return [BabyTrader.Customer.acceptStrings[getRandomNumber(BabyTrader.Customer.acceptStrings.length)]];
        };
        Customer.prototype.checkElementAvailability = function (babyAttribute) {
            var index = 0;
            var check = false;
            while (!check && (index <= this.attributes.length - 1)) {
                if (this.attributes[index].getName() === babyAttribute.getName()) {
                    check = true;
                }
                index++;
            }
            return check;
        };
        Customer.prototype.checkElementsAvailability = function (babyAttributes) {
            var index = 0;
            var check = 0;
            // t t t f's case, even though everything is right, it becomes false
            while ((check <= this.attributes.length - 1) && (index <= babyAttributes.length - 1)) {
                // count match
                if (this.checkElementAvailability(babyAttributes[index])) {
                    check++;
                }
                index++;
            }
            return check >= this.attributes.length ? true : false;
        };
        Customer.prototype.getMissingAttribute = function (babyAttributes) {
            var i = 0;
            var j = 0;
            var check = false;
            var checkInside = false;
            var returnAttribute = null;
            while (!check && (i <= this.attributes.length - 1)) {
                // check if this attribute has a match in baby attributes
                while (!checkInside && (j <= babyAttributes.length - 1)) {
                    if (this.attributes[i].getName() === babyAttributes[j].getName()) {
                        checkInside = true;
                    }
                    else {
                        j++;
                    }
                }
                // loop did not find match, that means this is the missing attribute
                if (!checkInside) {
                    check = true;
                    returnAttribute = this.attributes[i];
                }
                else {
                    checkInside = false;
                    j = 0;
                    i++;
                }
            }
            return returnAttribute;
        };
        Customer.attributes_max = 3;
        Customer.greetStrings = [
            "Hello, would you show me a baby who",
            "Hey, do you have a baby who",
            "Hi there, can I get a baby who",
            "What's up? Could you show me a baby who"
        ];
        Customer.rejectStrings = [
            "Are you listening to me?",
            "Did you hear what I said?",
            "That is not a baby that I want.",
            "You want to do business or what?",
            "You kidding me?"
        ];
        Customer.rejectRepeatStrings = [
            "I said,",
            "Telling you again,",
            "Do not make me repeat again,"
        ];
        Customer.acceptStrings = [
            "Thank you, this baby is great!",
            "I think I won't find a better baby.",
            "I will take the baby. Thanks.",
            "You have some nice goods, I like it."
        ];
        Customer.customerSprites = [
            'customers_001'
        ];
        return Customer;
    })();
    BabyTrader.Customer = Customer;
})(BabyTrader || (BabyTrader = {}));
//# sourceMappingURL=customer.js.map