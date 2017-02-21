/*
 The spread syntax allows an expression to be expanded in places where multiple arguments (for function calls)
 or multiple elements (for array literals) or multiple variables  (for destructuring assignment) are expected.
 */
let nums = [5, 4, 23, 2];
//This function call will return a NaN because it expect multiple arguments not an array (such as Math.max(5, 4, 23, 2);)
let max = Math.max(nums);
console.log("max:", max);

//Spead could be used to convert the array into multiple arguments
max = Math.max(...nums);
console.log("max:", max);

//Concatenate arrays using Spread
let parts = ['shoulders', 'knees'];
let body = ['head', ...parts, 'toes', 'face'];
console.log(body.join(", "));

//Convert a string to array using Spread
let abcArray = [..."abc"];
console.log(abcArray); // ['a', 'b', 'c']

//Another way of doing it. Convert a string to an array of characters
console.log( Array.from("Will this work?") );