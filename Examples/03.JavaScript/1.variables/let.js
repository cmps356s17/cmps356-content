"use strict";
function divide(x, y) {
    let returnVal;
    if (y != 0) {
        returnVal = x / y;
    }
    return returnVal;
}

console.log(divide(10, 2));

/*
    let is block-scoped
*/