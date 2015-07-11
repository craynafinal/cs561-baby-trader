var CustomerStatus;
(function (CustomerStatus) {
    CustomerStatus[CustomerStatus["Buy"] = 0] = "Buy";
    CustomerStatus[CustomerStatus["Sell"] = 1] = "Sell";
    CustomerStatus[CustomerStatus["Return"] = 2] = "Return";
})(CustomerStatus || (CustomerStatus = {}));
var Customer = (function () {
    function Customer(message) {
        //this.greeting = message;
    }
    Customer.prototype.greet = function () {
        //return "Hello, " + this.greeting;
    };
    return Customer;
})();
//# sourceMappingURL=customer.js.map