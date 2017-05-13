let courseRepo = require('../models/CourseRepository')
let commentRepo = require('../models/CommentRepository')

class CommentController {

  async index(req, res) {
    let courses = await courseRepo.getUserCourses(req.user.id)
    res.render('comments', { courses })
  }

  async commentEditor(req, res) {
    const userId = req.params.userId
    let courses = await courseRepo.getUserCourses(userId)
    res.render('commentEditor', { courses })
  }

  async getComments(req, res) {
    const userId = req.params.userId
    console.log("CommentController.userId", userId)

    const crn = req.params.crn
    //console.log("CommentController.crn", crn)

    let comments
    if (crn === 'all') {
      comments = await commentRepo.getUserComments(userId)
    } else {
      comments = await commentRepo.getCourseComments(crn)
    }
    //console.log("CommentController.getComments", comments)
    res.json(comments)
  }

  async addComment(req, res) {
    try {
      await commentRepo.addComment(req.body)
      res.redirect('/comments')
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }

}

module.exports = new CommentController()
