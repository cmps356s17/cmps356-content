'use strict'
let jsonPromise = new Promise( (resolve, reject) => {
    // JSON.parse throws an error if you feed it some
    // invalid JSON, so this implicitly rejects:
    resolve(JSON.parse("This ain't JSON"));
});

jsonPromise.then( data => {
    // This never happens:
    console.log("It worked!", data);
}).catch( err => {
    // Instead, this happens:
    console.log("It failed!", err);
});
