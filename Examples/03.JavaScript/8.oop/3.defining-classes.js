'use strict'
class Student {
    constructor(name, age) {
        this.name = name;
        this.avgLifeSpan = age;
    }

    saySalam() {
        console.log("Salamou Aleikoum! I am " + this.name + ". I am " + this.avgLifeSpan + " years old. <br>");
    }
}
 
let juha = new Student("Juha Nasreddin", 22);
let abbas = new Student("Abbas Ibn Firnas", 25);
let samir = new Student("Samir Saghir", 17);

juha.saySalam();
abbas.saySalam();
samir.saySalam();