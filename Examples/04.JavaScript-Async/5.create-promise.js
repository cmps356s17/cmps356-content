let request = require('request');

function getQuote() {
    return new Promise(function(resolve, reject) {
        let url = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';
        request(url, (error, response) => {
              resolve(JSON.parse(response.body));
        });
    });
}

getQuote().then( quote => {
    console.log(quote);
});