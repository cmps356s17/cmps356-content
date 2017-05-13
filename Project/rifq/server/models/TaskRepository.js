let courseRepo = require('./CourseRepository.js')
const fs = require('fs-extra')

class TaskRepository {


  async getTaskTypes() {
    return await fs.readJson('data/taskTypes.json')
  }

  async getCourseTasks(crn) {
    const course = await courseRepo.getCourse(crn)
    delete course.comments // no need to return the tasks
    return [course] //return as an array to have the same UI for 1 or many courses
  }

  async getUserTasks(userId) {
      let courses = await courseRepo.getUserCourses(userId)
      courses = courses.map(c => {
        delete c.comments  // no need to return the comments
        return c
      })
      return courses
  }

    async getTask(courseCrn, taskId){
        const course = await courseRepo.getCourse(courseCrn)
        return course.tasks.find(t => t.id == taskId)
    }

    async deleteTask(courseCrn, taskId) {
        let courses = await courseRepo.getCourses()
        let courseIndex = courses.findIndex( c => c.crn == courseCrn)

        console.log("deleteTask.courseIndex" + courseIndex)
        let taskIndex = courses[courseIndex].tasks.findIndex( t => t.id == taskId )

        if (taskIndex >= 0) {
          courses[courseIndex].tasks.splice(taskIndex, 1)
        }
        fs.writeJson('data/courses.json', courses)
    }

    async getCalendarTasks(userId) {
      let courses = await this.getUserTasks(userId)
      const tasks = []

      courses.forEach(course => {
        if (course.tasks && course.tasks.length > 0) {

          course.tasks = course.tasks.map(t => {
            const task = {
              title: `${course.code} - ${t.title}`,
              start:  t.dueDate,
              allDay: true
            }
            console.log("getCalendarTasks.task", task)
            return task
          });

          tasks.push(...course.tasks)
        }
      })

      return tasks
    }

    async addTask(task) {
      const courses = await courseRepo.getCourses()

      // Look for the course to be updated then update it
      const foundIndex = courses.findIndex(c => c.crn == task.crn)
      console.log("TaskRepository.addTask.foundIndex", foundIndex, task.crn)

      if (foundIndex >= 0) {
        const course = courses[foundIndex]
        let maxId = 1

        if (!course.tasks) {
          course.tasks = []
        } else {
          //Get the last Id used +1
          maxId = Math.max(...course.tasks.map(c => c.id)) + 1
          console.log("TaskRepository.addTask.maxId", maxId)
        }

        task.id = maxId
        delete task.crn

        course.tasks.push(task)
        console.log("TaskRepository.addTask.course", course)

        fs.writeJson('data/courses.json', courses)
      }
    }

    async updateTask(task) {
      const courses = await courseRepo.getCourses()

      // Look for the course to be updated then update it
      const foundIndex = courses.findIndex(c => c.crn == task.crn)
      console.log("TaskRepository.updateTask.foundIndex", foundIndex, task.crn)

      if (foundIndex >= 0) {
        const course = courses[foundIndex]

        if (course.tasks) {
          const taskFoundIndex = course.tasks.findIndex(t => t.id == task.id)

          delete task.crn
          course.tasks[taskFoundIndex] = task

          console.log("TaskRepository.updateTask.task", task)

          fs.writeJson('data/courses.json', courses)
        }
      }
    }

    async getWorkloadReport(userId) {
      const taskTypes = await this.getTaskTypes()
      const courses = await courseRepo.getUserCourses(userId)

      const courseSummaries = []

      courses.forEach(course => {
        const courseSummary = {}
        courseSummary.assessmentCount = 0
        courseSummary.effortHours = 0
        courseSummary.code = course.code
        courseSummary.name = course.name

        if (course.tasks && course.tasks.length > 0) {
          taskTypes.forEach(tt => {
            //do for each taskType
            const courseTasks = course.tasks.filter(task => task.taskType == tt.code)
            if (courseTasks && courseTasks.length > 0) {
              courseSummary[tt.code] = courseTasks.length
              courseSummary.assessmentCount += courseTasks.length
            }
          })

          courseSummary.effortHours = course.tasks.reduce((accum, curr) => accum += curr.effortHours, 0)

          courseSummaries.push(courseSummary)
        }
      })

      console.log(courseSummaries)
      return courseSummaries
    }

    async getTasksCount(crn, taskType) {
      const course = await courseRepo.getCourse(crn)
      let count = 0
      if (course.tasks && course.tasks.length > 0) {
          const courseTasks = course.tasks.filter(task => task.taskType == taskType)
          if (courseTasks && courseTasks.length > 0) {
            count = courseTasks.length
            //console.log("getTasksCount", taskType, count)
          }
      }
      return count
    }
}

module.exports = new TaskRepository()
