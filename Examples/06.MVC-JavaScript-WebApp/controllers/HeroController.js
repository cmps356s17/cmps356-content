class HeroController {
    constructor() {
        this.heroRepository = require('./../models/HeroRepository');
    }

    async getHeroes(req, res) {
        const heroes = await this.heroRepository.getHeroes();
        res.json(heroes);
    }

    async getHero (req, res) {
        try {
            let heroId = req.params.id;
            console.log('req.params.id', heroId);
            const hero = await this.heroRepository.getHero(parseInt(heroId));
            console.log(JSON.stringify(hero, null, 2));
            res.json(hero);
        }
        catch (err) {
            res.status(404).send("Failed :" + err);
        }
    }

    async addHero(req, res) {
        try {
            let hero = req.body;
            hero = await this.heroRepository.addHero(hero);
            let urlOfNewHero = `/api/heroes/${hero.id}`;
            res.location(urlOfNewHero)
            res.status(201).send(`Created and available @ ${urlOfNewHero}`);
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    async updateHero(req, res) {
        try {
            let hero = req.body;

            await this.heroRepository.updateHero(hero);
            res.status(200).send("Hero updated successfully");
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    async deleteHero(req, res) {
        try {
            let heroId = req.params.id;

            await this.heroRepository.deleteHero(heroId);
            res.status(200).send("Hero deleted");
        }
        catch (err) {
            res.status(500).send(err)
        }
    }
}

module.exports = new HeroController();