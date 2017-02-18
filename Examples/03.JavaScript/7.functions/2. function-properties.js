"use strict";
function max (arr) {
	let maxValue = arr[0];
	for (let i = 1; i < arr.length; i++) {
		maxValue = Math.max(maxValue, arr[i]);
	}
	return maxValue;
}

console.log(max.length); //returns 1
console.log(max.name); //returns "max"
console.log((function(){}).name);