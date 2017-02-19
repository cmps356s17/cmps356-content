class Person {
    constructor (name) {
        this.name = name;
    }
    greeting () {
        return `Salam! I am ${this.name}`;
    }
}

class Student extends Person {
    constructor (name, gpa) {
        super(name);
        this.gpa = gpa;
    }

    greeting () {
        return `${super.greeting()}. My gpa is ${this.gpa}`;
    }
}

class Teacher extends Person {
    constructor (name, area)
    {
        super(name);
        this.name = name;
        this.area = area;
    }

    greeting () {
        return `${super.greeting()}. My area is ${this.area}`;
    }
}

let ali = new Teacher('Ali Ramadan', 'Usul Al-fiqh');
//Override greeting function for Ali
ali.greeting = function() {
        return `Salamou Aleikoum Wa Rahmatu Allah Wa Barakatuhu! Akhokum Fi Lah ${this.name}. Mudaris ${this.area}.`;
};

let people = [
    new Teacher('Joha', 'Math'),
    new Student('Samir', 3.5),
    new Person('Salaheddine'),
    new Teacher('Moza', 'Literature'),
    ali
];

//I can extend the class. All objects will pick up the new definitions
Person.prototype.nationality = 'Qatari';

Person.prototype.greeting = function() {
    return `Salam! I am ${this.name}. I am ${this.nationality}`;
}

for(let person of people) {
    console.log(person.greeting());
}

console.log('ali instanceof Teacher: ', ali instanceof Teacher);
console.log('people[1] instanceof Teacher: ', people[1] instanceof Teacher);
console.log('ali instanceof Object: ', ali instanceof Object);

//Get the Class Type of an object
console.log('Object.getPrototypeOf(ali): ', Object.getPrototypeOf(ali));
console.log('Object.getPrototypeOf(people[1]): ', Object.getPrototypeOf(people[1]));

console.log('ali.__proto__ : ', ali.__proto__);
console.log('Teacher.__proto__ : ', Teacher.__proto__);
console.log('Person.__proto__ : ', Person.__proto__);