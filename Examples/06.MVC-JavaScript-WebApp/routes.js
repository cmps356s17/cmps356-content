let express = require('express');

let router = express.Router();

let studentController = require('./controllers/StudentController');
let heroController = require('./controllers/HeroController');

router.route('/api/students').get( studentController.getStudents );
router.route('/api/students/:id').get( (req, res) => studentController.getStudent (req, res) );

router.route('/api/heroes').get( (req, res) => heroController.getHeroes(req, res) );
router.route('/api/heroes/:id').get( (req, res) => heroController.getHero(req, res) );
router.route('/api/heroes/').post( (req, res) => heroController.addHero(req, res) );
router.route('/api/heroes/:id').put( (req, res) => heroController.updateHero(req, res) );
router.route('/api/heroes/:id').delete( (req, res) => heroController.deleteHero(req, res) );

router.route('/').get( (req, res) => {
    res.sendfile("views/index.html");
});

router.route('/').post((req, res) => {
    let userInfo = req.body;
    console.log("router.route().post.req.body", userInfo);

    if (userInfo.requestedPage === 'student') {
        studentController.index(req, res);
    } else {
        res.sendfile("views/hero.html");
    }
});

router.route('/about').get((req, res) => {
    res.send(`Welcome to Client-Server WebApp Example!!! <br>
    <p>
        Urls: <br>
        - http://localhost:9080/   homepage <br>
        - http://localhost:9080/api/students     to get students as a json document <br>
        - http://localhost:9080/api/students/2015001   to get details of student 2015001 as a json document <br><br>
        - http://localhost:9080/views/hero.html    to interact with the list of heros <br>
        - http://localhost:9080/api/heroes    to get heroes as a json document <br>
        - http://localhost:9080/api/heroes/1    to get hero 1 as a json document <br>
        - Use Postman to test post/put/delete http://localhost:9080/api/heroes <br>
    </p>`);
});

module.exports = router;
