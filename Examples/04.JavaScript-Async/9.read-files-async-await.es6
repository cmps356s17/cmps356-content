let fs = require('fs-promise');

function getStudent(studentId) {
    return fs.readFile('./data/student.json').then(data => {
        let students = JSON.parse(data);
        students = students.filter(s => s.studentId === studentId);
        if (students.length > 0) {
            delete students[0].password;
            return students[0];
        }
        else {
            throw new Error("No records found");
        }
    });
}

function getCourses(courseIds) {
    return fs.readFile('./data/course.json').then(data => {
        let courses = JSON.parse(data);
        courses = courses.filter(c => courseIds.indexOf(c.crn) >= 0);
        //console.log(courses);
        return courses;
    });
}

function getCourseInstructor(course) {
    return fs.readFile('./data/staff.json').then(data => {
        let instructors = JSON.parse(data);
        course.instructor = instructors.filter(i => i.staffNo === course.instructorId)[0];
        delete course.instructor.password;
        return course;
    });
}

/*
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
*/

// create a new "async" function so we can use the "await" keyword
async function getStudentCourses(studentId) {
    let student = await getStudent(studentId);
    let courses = await getCourses(student.courseIds);
    courses = await Promise.all(courses.map(getCourseInstructor));
    student.courses = courses;
    return student;
}

let studentId = 2015001;
getStudentCourses(studentId).then(student => {
    //Displays a pretty-printed multiline JSON representation indented with 2 spaces
    console.log(JSON.stringify(student, null, 2));
});