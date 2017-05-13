const fs = require('fs-extra')
const userRepo = require('./UserRepository.js')

class CourseRepository {

    async getCourses() {
      return await fs.readJson('data/courses.json')
    }

    async getUserCourses(userId) {
        const user = await userRepo.getUser(userId)
        const courses = await this.getCourses()
        switch (user.type) {
          case "Faculty":
            return courses.filter( c => c.instructorId == userId )

          case "Coordinator":
            return courses.filter( c => c.program == user.program )

          case "Student":
            return courses.filter( c => user.courseIds.indexOf(c.crn) > 0)
        }
    }

    async getCourse(crn) {
        const courses = await this.getCourses()
        return courses.find(c => c.crn == crn)
    }
}

module.exports = new CourseRepository()
