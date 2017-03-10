let fs = require('fs-promise');

let studentPromise = fs.readFile('data/student2.json');





function getStudent(studentId) {
    return fs.readFile('data/student.json').then(data => {
        let students = JSON.parse(data);
        let student = students.find(s => s.studentId === studentId);
        if (student != "undefined") {
            return student;
        }
        else {
            throw new Error("No records found");
        }
    });
}

function getCourses(courseIds) {
    return fs.readFile('data/course.json').then(data => {
        let courses = JSON.parse(data);
        courses = courses.filter(c => courseIds.indexOf(c.crn) >= 0);
        //console.log(courses);
        return courses;
    });
}

function getCourseInstructor(course) {
    return fs.readFile('data/staff.json').then(data => {
        let instructors = JSON.parse(data);
        course.instructor = instructors.filter(i => i.staffNo === course.instructorId)[0];
        delete course.instructor.password;
        return course;
    });
}

//Promises chaining
function getStudentCourses(studentId) {
    let student;
    return getStudent(studentId).then(astudent => {
        student = astudent;
        return getCourses(student.courseIds);
    }).then(courses => {
        return Promise.all(courses.map(getCourseInstructor));
    }).then(courses => {
        student.courses = courses;
        return student;
    });
}

let studentId = 2015001;
getStudent(studentId).then(student => {
    //Displays a pretty-printed multiline JSON representation indented with 2 spaces
    console.log(JSON.stringify(student, null, 2));
}).catch(err => console.log(err));


getStudentCourses(studentId)
    .then(student => {
        console.log("\nStudent with course details: ");
        console.log(JSON.stringify(student, null, 2));
    })
    .catch(err => console.log(err));

