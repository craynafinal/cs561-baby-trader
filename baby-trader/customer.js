/****************************************************************************************
Copyright (C) 2015 Jong Seong Lee
jsl@pdx.edu
Portland State University

This program is licensed under the MIT License.
Please see the file COPYING in the source distribution of this software for license terms.
****************************************************************************************/
var BabyTrader;
(function (BabyTrader) {
    var CustomerStatus;
    (function (CustomerStatus) {
        CustomerStatus[CustomerStatus["Buy"] = 0] = "Buy";
        CustomerStatus[CustomerStatus["Sell"] = 1] = "Sell";
        CustomerStatus[CustomerStatus["Return"] = 2] = "Return";
    })(CustomerStatus || (CustomerStatus = {}));
    var Customer = (function () {
        function Customer() {
            this.attributes = new Array();
            this.sprite = null;
            insertAttributeToArrayAsSet(this.attributes, BabyTrader.Customer.attributes_max);
            this.sprite = BabyTrader.Customer.customerSprites[getRandomNumber(BabyTrader.Customer.customerSprites.length)];
        }
        Customer.prototype.getSprite = function () {
            return this.sprite;
        };
        Customer.prototype.greet = function () {
            var returnString = BabyTrader.Customer.greetStrings[getRandomNumber(BabyTrader.Customer.greetStrings.length)] + BabyTrader.Customer.getSummedAttributeStrings(this.attributes, '?');
            /*
            this.attributes.forEach(function (attribute, index, array) {
                returnString = returnString + " " + attribute.getDescription();
                if (index < array.length - 1) {
                    returnString = returnString + ",";
                } else {
                    returnString = returnString + "?";
                }
            });*/
            return [returnString];
        };
        Customer.getSummedAttributeStrings = function (attributes, lastCharacter) {
            var returnString = '';
            attributes.forEach(function (attribute, index, array) {
                returnString = returnString + " " + attribute.getDescription();
                if (index < array.length - 1) {
                    returnString = returnString + ",";
                }
                else {
                    returnString = returnString + lastCharacter;
                }
            });
            return returnString;
        };
        Customer.prototype.reject = function () {
            return [BabyTrader.Customer.rejectStrings[getRandomNumber(BabyTrader.Customer.rejectStrings.length)], BabyTrader.Customer.rejectRepeatStrings[getRandomNumber(BabyTrader.Customer.rejectRepeatStrings.length)] + BabyTrader.Customer.getSummedAttributeStrings(this.attributes, '?')];
        };
        Customer.prototype.accept = function () {
            return [BabyTrader.Customer.acceptStrings[getRandomNumber(BabyTrader.Customer.acceptStrings.length)]];
        };
        Customer.prototype.checkAvailability = function (babyAttributes) {
            var returnCheck = false;
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
                }
                else {
                    index = this.attributes.length + 1;
                }
            }
            return returnCheck;
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