'use strict';
/*If the script is running under node.js then import babel-polyfill module to allow 
 using async and await since these new features are not yet suppored in Node.js and browsers
 */

if (typeof window === 'undefined') {
    require("babel-polyfill");
    var fetch = require('node-fetch');
}

function fetchCountries(region) {
    var url = 'https://restcountries.eu/rest/v1/region/' + region;
    return fetch(url).then(function (response) {
        return response.json();
    });
}

// create a new "async" function so we can use the "await" keyword
function getCountries(region) {
    var countries;
    return regeneratorRuntime.async(function getCountries$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(fetchCountries(region));

                case 3:
                    countries = _context.sent;

                    displayCountries(region, countries);
                    _context.next = 10;
                    break;

                case 7:
                    _context.prev = 7;
                    _context.t0 = _context['catch'](0);

                    // promise was rejected and we can handle errors with try/catch!
                    console.log(_context.t0);

                case 10:
                case 'end':
                    return _context.stop();
            }
        }
    }, null, this, [[0, 7]]);
}

function displayCountries(region, countries) {
    log('Countries in ' + region + ' and their capital city:');
    countries.forEach(function (country) {
        log(country.name + ' - ' + country.capital);
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
