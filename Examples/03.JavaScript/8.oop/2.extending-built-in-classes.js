'use strict'
Array.prototype.getMax = function () {
    let max = this[0];
    for (let i = 1; i < this.length; i++) {
        if (max < this[i]) {
            max = this[i];
        }
    }
    return max;
}

//adding a method to arrays to sum their number elements
Array.prototype.sum = function(){
    let sum = 0;
    for(let index in this){
        if(typeof this[index] === "number"){
            sum += this[index];
        }
    }
    return sum;
}

let numbers = [9, 1, 11, 3, 4];
let max = numbers.getMax();
console.log(`[${numbers.join(', ')}].getMax() = ${max}`);

console.log(`[${numbers.join(', ')}].sum() = ${numbers.sum()}`);