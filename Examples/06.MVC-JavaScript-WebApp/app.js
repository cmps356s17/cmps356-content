
let express		 =	require('express');
let bodyParser   = 	require('body-parser');
let handlebars   =  require('express-handlebars');

let app			 =	express();

//Allow serving static files
app.use( express.static(__dirname) );

/*
 body-parser extracts the entire body portion of an incoming request and assigns it to req.body.
 Parses the body text as URL encoded data (which is how browsers send form data from forms with method set to POST)
 and exposes the resulting object (containing the keys and values) on req.body.
 */
app.use( bodyParser.urlencoded({extended: true}) );
//aut-deserialize the body of incoming request to a json object
//app.use( bodyParser.json() );

// Bind Handlebars View Engine to html extension so express knows what extension to look for.
//set extension to .html so handlebars knows what to look for
app.engine('hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));

// Register handlebars as our view engine as the view engine
app.set('view engine', 'hbs');

//Set the location of the view templates
app.set('views', __dirname + '/views');

let studentRepository = require('./StudentRepository');
let heroController = require('./HeroController');

app.get('/api/students', async (req, res) => {
    let students = await studentRepository.getStudents();
    res.json(students);
});

app.get('/api/students/:id', async (req, res) => {
    let studentId = req.params.id;
    console.log('req.params.id', studentId);
    try {
        let student = await studentRepository.getStudentCourses( parseInt(studentId) );
        //console.log(JSON.stringify(student, null, 2));
        res.json(student);
    }
    catch (err) {
        res.send("Failed :" + err);
    }
});

app.post('/', async (req, res) => {
    let userInfo = req.body;
    console.log("app.post.req.body", userInfo);

    if (userInfo.requestedPage === 'student') {
        let students = await studentRepository.getStudents();
        res.render('student', { username: userInfo.username, students });
    } else {
        res.sendfile("hero.html");
        //userInfo.redirectTo = '/hero.html';
        //res.json(userInfo);
    }
});

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

app.get('/api/heroes', (req, res) => heroController.getHeroes(req, res));
app.get('/api/heroes/:id', (req, res) => heroController.getHero(req, res));
app.post('/api/heroes/', (req, res) => heroController.addHero(req, res));
app.put('/api/heroes/:id', (req, res) => heroController.updateHero(req, res));
app.delete('/api/heroes/:id', (req, res) => heroController.deleteHero(req, res));

let port = 9080;
app.listen(port, () => {
    console.log('Students App is running @ http://localhost:' + port);
});