enum CustomerStatus { Buy, Sell, Return }

class Customer {
    money: number;
    hitPoint: number;
    angry: boolean;
    status: CustomerStatus;
    attributes: Attribute[];

    constructor(message: string) {
        //this.greeting = message;
    }
    greet() {
        //return "Hello, " + this.greeting;
    }
}