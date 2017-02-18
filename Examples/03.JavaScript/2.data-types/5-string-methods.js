"use strict";
let sentence = "Sample sentence to show string methods";

console.log(sentence);
console.log("length = " + sentence.length);

console.log("sentence[5] = " + sentence[5]);
console.log("sentence.charAt(5) = " + sentence.charAt(5));

console.log("'" + sentence + "'.indexOf('string') = " + sentence.indexOf("string"));
console.log("'" + sentence + "'.indexOf('string',8) = " + sentence.indexOf("string", 8));
console.log("'" + sentence + "'.indexOf('string',23) = " + sentence.indexOf("string", 40));

console.log("'" + sentence + "'.substring(3,5) = '" + sentence.substring(3, 5) + "'");

let str = "                  There is elegance in simplicity                ";

console.log("trimming whitespace");
console.log("original: !" + str + "!");

console.log("trim: !" + str.trim() + "!");
console.log("trimLeft: !" + str.trimLeft() + "!");
console.log("trimRight: !" + str.trimRight() + "!");
