"use strict";

function orderBy(a, b) {
	//return (a == b) ? 0 : (a > b) ? 1 : -1;
	return a - b;
};
let numbers = [5, 4, 23, 2];

//Alphabetical Sort
numbers.sort();
console.log(numbers.join(", "));

numbers.sort(orderBy);
console.log(numbers.join(", "));
//returns 2, 4, 5, 23
