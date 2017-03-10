let express = require('express'),
    bodyParser = require('body-parser')
    //open = require('open');

let app = express();
//Allow serving static files
app.use(express.static(__dirname));

let port = 9080;

app.use(bodyParser.urlencoded({extended:true}));
//aut-deserialize the body of incoming request to a json object
app.use(bodyParser.json());


let studentRepository = require('./StudentRepository');
let heroController = require('./HeroController');

app.get('/about', (req, res) => {
    res.send(`Welcome to Client-Server WebApp Example!!! <br>
    <p>
        Urls: <br>
        - http://localhost:9080/student.html to interact with the list of students <br>
        - http://localhost:9080/api/students  to get students as a json document <br>
        - http://localhost:9080/api/students/2015001 to get details of student 2015001 as a json document <br><br>
        - http://localhost:9080/hero.html to interact with the list of heros <br>
        - http://localhost:9080/api/heroes to get heroes as a json document <br>
        - http://localhost:9080/api/heroes/1 to get hero 1 as a json document <br>
        - Use Postman to test post/put/delete http://localhost:9080/api/heroes <br>
    </p>`);
});

app.get('/api/students', async (req, res) => {
    let students = await studentRepository.getStudents();
    res.json(students);
/*    studentRepository.getStudents().then(students => {
        res.json(students);
    });*/
});

app.get('/api/students/:id', async (req, res) => {
    let studentId = req.params.id;
    console.log('req.params.id', studentId);
    try {
        let student = await studentRepository.getStudent(parseInt(studentId));
        console.log(JSON.stringify(student, null, 2));
        res.json(student);
    }
    catch (err) {
        res.send("Failed :" + err);
    }
});

app.post('/', (req, res) => {
    let userInfo = req.body;
    console.log("app.post.req.body", userInfo);

    if (userInfo.requestedPage === 'student') {
        userInfo.redirectTo = '/student.html';
        res.json(userInfo);
    } else {
        userInfo.redirectTo = '/hero.html';
        res.json(userInfo);
    }
});

app.get('/api/heroes', (req, res) => heroController.getHeroes(req, res));
app.get('/api/heroes/:id', (req, res) => heroController.getHero(req, res));
app.post('/api/heroes/', (req, res) => heroController.addHero(req, res));
app.put('/api/heroes/:id', (req, res) => heroController.updateHero(req, res));
app.delete('/api/heroes/:id', (req, res) => heroController.deleteHero(req, res));

app.listen(port, function(){
    console.log('Students App is running @ http://localhost:' + port);
});