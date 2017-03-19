'use strict'

class Utils {
    constructor() {
        this.fs = require('fs');
    }

    //Read a file and convert its content to a json object
    readJsonFile(filePath) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(filePath, (error, data) => {
                if (error) {
                    reject("Reading file failed: " + error);
                }
                else {
                    let json = JSON.parse(data);
                    resolve(json);
                }
            });
        });
    }

    writeToJsonFile(filePath, data) {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(filePath, JSON.stringify(data), error => {
                if (error) {
                    reject("Write to file failed: " + error);
                }
                else {
                    resolve();
                }
            });
        });
    }

    flattenMultiArray(arrayOfArrays) {
        //Using ES2015 spread operator to flatten multidimensional arrayOfArrays
        return [].concat(...arrayOfArrays);
    }
}

module.exports = new Utils();