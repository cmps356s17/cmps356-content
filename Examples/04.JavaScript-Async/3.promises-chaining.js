'use strict'
let promise = new Promise( resolve => {
    resolve(1);
});



promise.then( val => {
    console.log(val); // 1
    return val + 2;
}).then( val => {
    console.log(val); // 3
});


// producer creates a promise, resolves when ready
function timeout(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

console.log("start");

// consumer gets a promise, is notified when resolved
let p = timeout(1000);
p.then(() => console.log("Displayed after 1 second"));
