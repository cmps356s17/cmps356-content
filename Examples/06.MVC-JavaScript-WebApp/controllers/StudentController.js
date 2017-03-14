class StudentController {
    constructor() {
        this.studentRepository = require('./../models/StudentRepository');
    }

    async getStudents(req, res) {
        let students = await
            this.studentRepository.getStudents();
        res.json(students);
    }

    async getStudent(req, res) {
        let studentId = req.params.id;
        console.log('req.params.id', studentId);
        try {
            let student = await
                this.studentRepository.getStudentCourses(parseInt(studentId));
            //console.log(JSON.stringify(student, null, 2));
            res.json(student);
        }
        catch (err) {
            res.send("Failed :" + err);
        }
    }

    async index (req, res) {
        let userInfo = req.body;
        console.log("app.post.req.body", userInfo);
        let students = await this.studentRepository.getStudents();
        res.render('student', {username: userInfo.username, students});
    }
}

module.exports = new StudentController();