const express = require('express')
const homeController = require('./controllers/HomeController')
const commentController = require('./controllers/CommentController')
const taskController = require('./controllers/TaskController')
const router = express.Router()
const userRepo = require('./models/UserRepository.js')

router.route('/login')
  .get((req, res) => homeController.index(req, res))
  .post((req, res) => homeController.login(req, res))

router.get('/logout', (req, res) => {
  res.cookie('userId', '', { expires: new Date(0) } )
  res.cookie('userType', '', { expires: new Date(0) } )
  res.redirect("/login")
})

//Middleware to intercept requests and redirect to the login page if the user is not logged-in
router.use( async (req, res, next) => {
  if (!req.cookies.userId) {
    res.redirect("/login")
  }
  else {
    //Get the user details and store them in the request variable
    const user = await userRepo.getUser(req.cookies.userId)
    req.user = user

    console.log("ui-route user.id", req.user.id )

    //Allows accessing user object from handlebars template
    user.fullname = `${user.firstname} ${user.lastname}`
    user.isStudent = (user.type === 'Student')
    user.IsFaculty = (user.type === 'Faculty')
    res.locals.user = user
    return next()
  }
})

router.get('/', (req, res) => res.render('index'))

router.get('/tasks', (req, res) => taskController.index(req, res) )

//Returns the task editor form for add
router.get('/courses/:userId/tasks', (req, res) => taskController.taskEditor(req, res) )

//Returns the task editor form for update
router.get('/courses/:userId/:crn/tasks/:taskId', (req, res) => taskController.taskEditor(req, res) )

router.post('/tasks', (req, res) => taskController.postTask(req, res))

router.get('/comments', (req, res) => commentController.index(req, res) )
router.get('/courses/:userId/comments', (req, res) => commentController.commentEditor(req, res) )

router.post('/comments', (req, res) => commentController.addComment(req, res) )

router.get('/workload', (req, res) => taskController.getWorkloadReport(req, res))

router.get('/calendar', async (req, res) => res.render("calendar"))

module.exports = router
