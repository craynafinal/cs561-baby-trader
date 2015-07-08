var Attributes = (function () {
    function Attributes(message) {
        this.greeting = message;
    }
    Attributes.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Attributes;
})();
//# sourceMappingURL=attributes.js.map