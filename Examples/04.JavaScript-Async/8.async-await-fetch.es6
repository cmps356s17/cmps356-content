'use strict'
/*If the script is running under node.js then import babel-polyfill module to allow 
 using async and await since these new features are not yet suppored in Node.js and browsers
 */
if (typeof window === 'undefined') {
    //require("babel-polyfill");
    var fetch = require('node-fetch');
}

function fetchCountries(region) {
    let url = `https://restcountries.eu/rest/v1/region/${region}`;
    return fetch( url ).then(response => response.json());
}

// create a new "async" function so we can use the "await" keyword
async function getCountries(region) {
    // "await" resolution or rejection of the promise
    // use try/catch for error handling
    try {
        let countries = await fetchCountries(region);
        displayCountries(region, countries);
    } catch (err) {
        // promise was rejected and we can handle errors with try/catch!
        console.log(err);
    }
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