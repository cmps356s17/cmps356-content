const fs = require('fs-extra')
const courseRepo = require('./CourseRepository.js')

class CommentRepository {

  async getCourseComments(crn) {
    const course = await courseRepo.getCourse(crn)
    delete course.tasks // no need to return the tasks
    return [course] //return as an array to have the same UI for 1 or many courses
  }

  async getUserComments(userId) {
    let courses = await courseRepo.getUserCourses(userId)
    courses = courses.map(c => {
      delete c.tasks  // no need to return the tasks
      return c
    })
    return courses
  }

  async addComment(comment) {

    const courses = await courseRepo.getCourses()

    // Look for the course to be updated then update it
    const foundIndex = courses.findIndex(c => c.crn == comment.crn)
    console.log("CommentRepository.addComment.foundIndex", foundIndex, comment.crn)

    if (foundIndex >= 0) {
      const course = courses[foundIndex]

      let maxId = 1
      if (!course.comments) {
        course.comments = []
      } else {
        //Get the last Id used +1
        maxId = Math.max(...course.comments.map(c => c.id)) + 1
        console.log("CommentRepository.addComment.maxId", maxId)
      }

      comment.id = maxId
      delete comment.crn
      const today = new Date()
      comment.createdDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

      course.comments.push(comment)
      //console.log("CommentRepository.addComment.course", course)

      fs.writeJson('data/courses.json', courses)
    }
  }

}

module.exports = new CommentRepository()
