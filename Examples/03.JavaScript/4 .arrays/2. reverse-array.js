"use strict";
let array = [1, 2, 3, 4, 5];

// Get array size
let length = array.length;

// Declare and create the reversed array
let reversed = new Array(length);

// Initialize the reversed array
for (let index = 0; index < length; index++) {
	reversed[length - index - 1] = array[index];
}

console.log("array = [" + array.join(", ") + "]");
console.log("reversed = [" + reversed.join(", ") + "]");

console.log("Simpler way! reversed = [" + array.reverse().join(", ") + "]");