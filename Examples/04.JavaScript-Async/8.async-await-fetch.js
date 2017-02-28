'use strict';
/*If the script is running under node.js then import babel-polyfill module to allow 
 using async and await since these new features are not yet suppored in Node.js and browsers
 */

// create a new "async" function so we can use the "await" keyword
let getCountries = (() => {
    var _ref = _asyncToGenerator(function* (region) {
        // "await" resolution or rejection of the promise
        // use try/catch for error handling
        try {
            let countries = yield fetchCountries(region);
            displayCountries(region, countries);
        } catch (err) {
            // promise was rejected and we can handle errors with try/catch!
            console.log(err);
        }
    });

    return function getCountries(_x) {
        return _ref.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (typeof window === 'undefined') {
    //require("babel-polyfill");
    var fetch = require('node-fetch');
}

function fetchCountries(region) {
    let url = `https://restcountries.eu/rest/v1/region/${region}`;
    return fetch(url).then(response => response.json());
}

function displayCountries(region, countries) {
    log(`Countries in ${region} and their capital city:`);
    countries.forEach(country => {
        log(`${country.name} - ${country.capital}`);
    });
}

function log(text) {
    //If running in node.js then write to the console otherwise write to the document 
    if (typeof window === 'undefined') {
        console.log(text);
    } else {
        document.writeln(text + '<br>');
    }
}

getCountries('asia');
