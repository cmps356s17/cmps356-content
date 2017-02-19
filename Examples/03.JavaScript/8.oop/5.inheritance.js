class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(this.name + ' makes a noise...');
    }
}

class Cat extends Animal {
    speak() {
        super.speak();
        console.log(this.name + ' Meow, Meow ');
    }
}

class Lion extends Cat {
    speak() {
        console.log(this.name + ' Roar, Roar ');
    }
}

let myLion = new Lion('Big lion');
myLion.speak();
myLion.toString();