'use strict'
class HeroController {
    constructor() {
        this.heroRepository = require('./HeroRepository');
    }

    getHeroes(req, res) {
        this.heroRepository.getHeroes().then(heroes => {
            res.json(heroes);
        });    
    }

    getHero (req, res) {
        let heroId = req.params.id;
        console.log('req.params.id', heroId);
        this.heroRepository.getHero(parseInt(heroId)).then(hero => {
            console.log(JSON.stringify(hero, null, 2));
            res.json(hero);
        }).catch(err => {
            res.status(404).send("Failed :" + err);
        });
    }
    
    addHero(req, res) {
        let hero = req.body;

        this.heroRepository.addHero(hero).then((hero)=> {
                let urlOfNewHero = `/api/heroes/${hero.id}`;
                res.location(urlOfNewHero)
                res.status(201).send(`Created and available @ ${urlOfNewHero}`);
            })
            .catch(err => res.status(500).send(err));
    }
    
    updateHero(req, res) {
        let hero = req.body;

        this.heroRepository.updateHero(hero).then(() => {
            res.status(200).send("Hero updated successfully");
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    }

    deleteHero(req, res) {
        let heroId = req.params.id;

        this.heroRepository.deleteHero(heroId).then(() => {
            res.status(200).send("Hero deleted");
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}

module.exports = new HeroController();