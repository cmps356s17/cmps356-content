const taskRepo = require('../models/TaskRepository')
const courseRepo = require('../models/CourseRepository')

class TaskController {

  async getTasks(req, res) {

    const userId = req.params.userId
    console.log("TaskController.userId", userId)

    const crn = req.params.crn
    //console.log("TaskController.crn", crn)

    let tasks
    if (crn === 'all') {
      tasks = await taskRepo.getUserTasks(userId)
    } else {
      tasks = await taskRepo.getCourseTasks(crn)
    }
    //console.log("TaskController.getTasks", tasks)
    res.json(tasks)
  }

  async index(req, res) {
    const courses = await courseRepo.getUserCourses(req.user.id)
    res.render('tasks', {courses})
  }

  async taskEditor(req, res) {
    const crn = req.params.crn
    const userId = req.params.userId
    const taskId = req.params.taskId

    const courses = await courseRepo.getUserCourses(userId)
    const taskTypes = await taskRepo.getTaskTypes()

    let task = { id : '', weight : 1 }
    if (crn && taskId) {
      task = await taskRepo.getTask(crn, taskId)
      task.crn = crn
      //console.log("taskEditor.task", task)
    }

    res.render('taskEditor', {courses, taskTypes, task})
  }

  async postTask(req, res) {
    try {
      const task = req.body

      console.log("postTask task.id", task.id)
      if (!task.id || task.id == '') {
        await taskRepo.addTask(task)
      }
      else {
        await taskRepo.updateTask(task)
      }
      res.redirect("/tasks")
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }


  async deleteTask(req, res) {
    try {
      await taskRepo.deleteTask(req.params.crn, req.params.taskId)
      res.status(200).send("ok")
    }
    catch (err) {
      res.status(500).send(err)
    }
  }

  async getCalendarTasks(req, res) {
    const userId = req.params.userId
    const tasks = await taskRepo.getCalendarTasks(userId)
    res.json(tasks)
  }

  async getTask(req, res) {
    const task = await taskRepo.getTask(req.params.crn, req.params.taskId)
    res.json(task)
  }

  async getWorkloadReport(req, res) {
    const courseSummaries = await taskRepo.getWorkloadReport(req.user.id)
    res.render("workload", {courseSummaries})
  }

  async getTasksCount(req, res) {
    const count = await taskRepo.getTasksCount(req.params.crn, req.params.taskType)
    res.json( {taskType: req.params.taskType, count} )
  }
}

module.exports = new TaskController()
