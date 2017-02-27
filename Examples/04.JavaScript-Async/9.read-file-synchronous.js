'use strict';
var fs = require('fs');

//Read a file and convert its content to json
function readJsonFile(filePath) {
    let data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function fetchStudent(studentId) {
    let students = readJsonFile('./data/student.json');
    students = students.filter(s => s.studentId === studentId);
    if (students.length > 0) {
        delete students[0].password;
        return students[0];
    } else {
        throw new Error("No records found");
    }
}

function getCourses(courseIds) {
    let courses = readJsonFile('./data/course.json');
    courses = courses.filter(c => courseIds.indexOf(c.crn) >= 0);
    return courses;
}

function getCourseInstructor (course) {
    let instructors = readJsonFile('./data/staff.json');
    course.instructor = instructors.filter(i => i.staffNo === course.instructorId)[0];
    delete course.instructor.password;
    return course;
}

// create a new "async" function so we can use the "await" keyword
function getStudent(studentId) {
    let student = fetchStudent(studentId);
    let courses = getCourses(student.courseIds);
    courses = courses.map(getCourseInstructor);
    student.courses = courses;
    return student;
}

let studentId = 2015001;
let student = getStudent(studentId);
//Displays a pretty-printed multiline JSON representation indented with 2 spaces
console.log(JSON.stringify(student, null, 2));