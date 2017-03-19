let express = require('express')

let router = express.Router()

let studentController = require('./controllers/StudentController')
let heroController = require('./controllers/HeroController')

//Middleware to intercept requests and username variable from handlebars template
router.use( (req, res, next) => {
    const username = req.cookies.username
    console.log("isAuthenticated.username", username)
    //Allows accessing username variable from handlebars template
    res.locals.username = username
    return next()
})

//Middleware to intercept requests and redirect to the login page if the user is not logged-in
function isAuthenticated(req, res, next) {
    const username = req.cookies.username
    console.log("isAuthenticated.username", username)
    if (!username) {
        res.redirect("/login")
    } else {
        return next()
    }
}

router.get('/api/students', studentController.getStudents )
router.get('/api/students/:id', (req, res) => studentController.getStudent(req, res) )
router.get('/students', isAuthenticated, (req, res) => studentController.index(req, res) )

router.get('/api/heroes', (req, res) => heroController.getHeroes(req, res) )
router.get('/api/heroes/:id', (req, res) => heroController.getHero(req, res) )
router.post('/api/heroes/', (req, res) => heroController.addHero(req, res) )
router.put('/api/heroes/:id', (req, res) => heroController.updateHero(req, res) )
router.delete('/api/heroes/:id', (req, res) => heroController.deleteHero(req, res) )

router.get('/heroes', isAuthenticated, (req, res) => heroController.index(req, res) )

router.post('/heroes', (req, res) => heroController.postHero(req, res) )

router.get('/login', (req, res) => res.sendFile(__dirname + "/views/login.html") )

router.get('/', (req, res) => res.render('index') )

router.post('/login', (req, res) => {
    let userInfo = req.body
    console.log("router.post.req.body", userInfo)

    //Return an accessCount cookie to the client -- expires is optional
    res.cookie('username', userInfo.username, { expires: new Date(Date.now() + 1000 * 360 * 1) })
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    //clear cookie
    res.cookie('username', '', {expires: new Date(0)})
    res.redirect("/")
})

module.exports = router
