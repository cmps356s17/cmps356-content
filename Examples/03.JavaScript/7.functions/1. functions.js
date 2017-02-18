"use strict";
function max (arr) {
    let maxValue = arr[0];
    for (let i = 1; i < arr.length; i++) {
        maxValue = Math.max(maxValue, arr[i]);
    }
    return maxValue;
}

console.log(max([1, 2, 3, 4, 45, 5, 6]));