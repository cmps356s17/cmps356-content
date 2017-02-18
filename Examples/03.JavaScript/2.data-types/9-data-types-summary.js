"use strict";
let string = 'Hello';
let int = 254;
let float = 25.4;
let arr = [1, 2, 3];
let object = {course: 'JS', part: 1};
let func = function(){return;};
let nullValue = null;
let undefinedValue = undefined;
let boolean = true;

let variables = [string, int, float, arr, object, func, nullValue, undefinedValue, boolean];

for(let variable of variables){
    console.log(getTypeString(variable));
}

function getTypeString(obj){
    let result = obj;
    result += ' is ' + typeof obj;
    return result;
}