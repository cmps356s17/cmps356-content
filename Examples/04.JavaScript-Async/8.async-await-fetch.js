

// create a new "async" function so we can use the "await" keyword
let getCountries = (() => {
    var _ref = _asyncToGenerator(function* (region) {
        let url = `https://restcountries.eu/rest/v1/region/${region}`;
        let response = yield fetch(url);
        let countries = response.json();
        return countries;
    });

    return function getCountries(_x) {
        return _ref.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*If the script is running under node.js then import 'node-fetch' package
 using async and await requires transpiling using babel as these features are not yet suppored in Node.js and browsers
 */
if (typeof window === 'undefined') {
    var fetch = require('node-fetch');
}

function displayCountries(region, countries) {
    log(`Countries in ${region} and their capital city:`);
    countries.map(country => {
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

let region = 'asia';
getCountries(region).then(countries => displayCountries(region, countries)).catch(err => console.log(err));
//# sourceMappingURL=8.async-await-fetch.js.map