"use strict";
//square the array elements and get even ones
let array = [1, 2, 3, 4, 5, 6, 7, 8].map(x => x*x).filter(x => x%2 === 0);
console.log(array);
// [ 1, 9, 25, 49 ]

//square the array elements and get odd ones
let intArray = [1,2,3,4,5,6,7,8];
let result = intArray.map(x => x*x).filter(x => x%2);
console.log(result);