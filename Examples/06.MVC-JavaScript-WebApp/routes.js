let express = require('express')

let router = express.Router()

let studentController = require('./controllers/StudentController')
let heroController = require('./controllers/HeroController')

router.get('/api/students', studentController.getStudents )
router.get('/api/students/:id', (req, res) => studentController.getStudent(req, res) )
router.get('/students', (req, res) => studentController.index(req, res) )

router.get('/api/heroes', (req, res) => heroController.getHeroes(req, res) )
router.get('/api/heroes/:id', (req, res) => heroController.getHero(req, res) )
router.post('/api/heroes/', (req, res) => heroController.addHero(req, res) )
router.put('/api/heroes/:id', (req, res) => heroController.updateHero(req, res) )
router.delete('/api/heroes/:id', (req, res) => heroController.deleteHero(req, res) )

router.get('/heroes', (req, res) => heroController.index(req, res) )

router.post('/heroes', (req, res) => heroController.postHero(req, res) )

router.get('/login', (req, res) => res.sendFile(__dirname + "/views/login.html") )

router.get('/', (req, res) => res.render('index') )

router.post('/login', (req, res) => {
    let userInfo = req.body
    console.log("router.post.req.body", userInfo)

    res.redirect('/')
})

module.exports = router
