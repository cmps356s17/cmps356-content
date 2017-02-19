let greeting = require('./greeting');

console.log('Loaded greeting module');
let text = greeting.yahala();
console.log(text);


let circle = require('./circle.js');
let r = 4;
console.log(`The area of radius ${r}: ${circle.area(r)}
              and its circumference is: ${circle.circumference(r)}`);
