'use strict'
let promise1 = Promise.resolve(100);
let promise2 = Promise.resolve(200);

Promise.all([promise1, promise2]).then( (reuslts) => {
    let total = reuslts.reduce( (sum, e) => sum + e);
    console.log(total);
});