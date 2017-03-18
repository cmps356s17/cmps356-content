class HeroController {
    constructor() {
        this.heroRepository = require('./../models/HeroRepository')
    }

    async getHeroes(req, res) {
        const heroes = await this.heroRepository.getHeroes()
        res.json(heroes)
    }

    async getHero (req, res) {
        try {
            const heroId = req.params.id
            console.log('getHero.req.params.id', heroId)
            const hero = await this.heroRepository.getHero(parseInt(heroId))
            console.log(JSON.stringify(hero, null, 2))
            res.json(hero)
        }
        catch (err) {
            res.status(404).send(err)
        }
    }

    async addHero(req, res) {
        try {
            let hero = req.body
            hero = await this.heroRepository.addHero(hero)
            const urlOfNewHero = `/api/heroes/${hero.id}`
            res.location(urlOfNewHero)
            res.status(201)
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    async updateHero(req, res) {
        try {
            const hero = req.body

            await this.heroRepository.updateHero(hero)
            res.status(200)
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    async deleteHero(req, res) {
        try {
            const heroId = req.params.id

            await this.heroRepository.deleteHero(heroId)
            res.status(200)
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    async index (req, res) {
/*        const userInfo = req.body
        console.log("heroController.index.req.body", userInfo)*/
        const heroes = await this.heroRepository.getHeroes()
        res.render('hero', { heroes })
    }

    async postHero(req, res) {
        try {
            const hero = req.body

            if (hero.id === '') {
                await this.heroRepository.addHero(hero)
            } else {
                hero.id = parseInt(hero.id)
                await this.heroRepository.updateHero(hero)
            }
            res.redirect("/heroes")
        }
        catch (err) {
            res.status(500).send(err)
        }
    }
}

module.exports = new HeroController()