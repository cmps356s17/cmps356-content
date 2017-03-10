'use strict'

class HeroRepository {
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

    writeJsonFile(filePath, data) {
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
    
    getHeroes() {
        return new Promise((resolve, reject) => {
            this.readJsonFile('./data/hero.json').then(heroes => {
                resolve(heroes);
            }).catch(err => {
                reject(err);
            });
        });
    }

    getHero(heroId) {
        return new Promise((resolve, reject) => {
            this.getHeroes().then(heroes => {
                heroes = heroes.filter(h => h.id === heroId);
                if (heroes.length > 0) {
                    resolve(heroes[0]);
                }
                else {
                    reject("No records found");
                }
            });
        });
    }

    addHero(hero) {
        return new Promise((resolve, reject) => {
            this.getHeroes().then(heroes => {
                //Get the last Id used +1
                let maxId = Math.max.apply(Math, heroes.map(h => h.id)) + 1;
                console.log("maxId", maxId);

                hero.id = maxId;

                console.log("heroController.addHero", hero);
                heroes.push(hero);
                return this.writeJsonFile('./data/hero.json', heroes);
            }).then(()=> resolve(hero))
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }
    
    updateHero(hero) {
        return new Promise((resolve, reject) => {
            this.getHeroes().then(heroes => {
                let len = heroes.length;
                for(let i=0; i<len; i++){
                    if (heroes[i].id == hero.id) {
                        heroes[i] = hero;
                        break;
                    }
                }
                return this.writeJsonFile('./data/hero.json', heroes);
            }).then(()=> resolve())
              .catch(err => {
                  console.log(err);
                  reject(err);
            });
        });
    }
    
    deleteHero(heroId) {
        return new Promise((resolve, reject) => {
            this.getHeroes().then(heroes => {
                // Look for the hero to be deleted then remove it
                let len = heroes.length;
                let foundAt = -1;
                for (let i = 0; i < len; i++) {
                    if (heroes[i].id == heroId) {
                        foundAt = i;
                        break;
                    }
                }
                if (foundAt >= 0) {
                    heroes.splice(foundAt, 1);
                }
                console.log("heroController.deleteHero", heroId);
                
                //Save the heros back to the file
                return this.writeJsonFile('./data/hero.json', heroes);
            }).then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = new HeroRepository();