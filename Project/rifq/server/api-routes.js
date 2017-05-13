const express = require('express')
const commentController = require('./controllers/CommentController')
const taskController = require('./controllers/TaskController')
const router = express.Router()

// Set the crn to 'all' to get comments for all courses
router.get('/courses/:userId/:crn/tasks', (req, res) => taskController.getTasks(req, res))
router.get('/courses/:crn/tasks/:taskId', (req, res) => taskController.getTask(req, res) )

router.delete('/courses/:crn/tasks/:taskId', (req, res) => taskController.deleteTask(req, res))

router.get('/courses/:userId/calendar', (req, res) => taskController.getCalendarTasks(req, res))

router.get('/courses/:crn/:taskType/count', (req, res) => taskController.getTasksCount(req, res))

// Set the crn to 'all' to get comments for all courses
router.get('/courses/:userId/:crn/comments', (req, res) => commentController.getComments(req, res))

module.exports = router
