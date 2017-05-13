let userRepo = require('../models/UserRepository')
let courseRepo = require('../models/CourseRepository')

class HomeController {

    async login(req, res) {
      try {
        let user = await userRepo.login(req.body.username, req.body.password)
        const duration7Days = 24 * 60 * 60 * 1000 * 7
        res.cookie('userId', user.id, { expires: new Date(Date.now() + duration7Days) } )
        res.cookie('userType', user.type, { expires: new Date(Date.now() + duration7Days) } )

        res.redirect("/")
      }
      catch (error) {
        res.render('login', { layout: false, error } )
      }
    }

    index(req, res){
        res.render('login', { layout: false })
    }
}

module.exports = new HomeController()
