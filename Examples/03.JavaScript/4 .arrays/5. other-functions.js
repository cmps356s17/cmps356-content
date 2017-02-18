"use strict";
let numbers = [5, 4, 23, 2];
let numbers2 = [1, 2, 3, 4, 5, 6];

let allNumbers = numbers.concat(numbers2);

console.log("[5, 4, 23, 2].concat([1, 2, 3, 4, 5, 6]): ");
allNumbers.forEach(function (item) {
	console.log(item + ", ");
});

console.log();
console.log("------------------------------");

allNumbers = new Array();
for (let i = 0; i < 20; i++) {
	allNumbers.push(i);
}

let even = allNumbers.filter(function (item) {
	return item % 2 == 0;
});

console.log("after [1, 2, ...., 18, 19].filter(item%2==0): ");
console.log(even.join(", "));
