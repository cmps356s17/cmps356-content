function sum() {
    //arguments is a built-in nums like object
    console.log("arguments", arguments);

    //create an nums from the nums like object
    let args = Array.from(arguments);
    console.log("args", args);

    //Compute the sum
    let sum = args.reduce((prev, curr) => prev + curr);
    return sum;
}

console.log( "sum:", sum(1, 3, 5) );

//Better way of doing it using the Spead syntax
function sum(... args) {
    console.log(args);
    let sum = args.reduce((prev, curr) => prev + curr);
    return sum;
}

console.log( "sum:", sum(1, 3, 5) );

// Convert a string to an array of characters
console.log( Array.from("Will this work?") );