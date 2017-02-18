"use strict";
function sum (array) {
    let total = 0;
    array.forEach(item => total = total + item);
    return total;
}

let myArray = [1, 2, 3];
let total = sum(myArray);
console.log(total);