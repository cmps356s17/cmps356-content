let fs = require('fs-promise');
let fetch = require("node-fetch");

let fetchProgram = () => {
    let url = "https://cmps356s17.github.io/data/program.json";
    return fetch(url).then(response => response.json());
}

let readProgram = () => {
    return fs.readFile('./data/program.json').then( data => JSON.parse(data) );
}

Promise.all([fetchProgram(), readProgram()]).then( programs => {
    //Flatten the array
    programs = programs.reduce( (prev, curr) => prev.concat(curr) );
    console.log("\nCombined results from all: ");
    console.log(programs);
});

Promise.race([fetchProgram(), readProgram()]).then( programs => {
    console.log("Results from race: ");
    console.log(programs);
});