'use strict'
require("babel-polyfill");
let fs = require('fs');

//Read a file and convert its content to a json object
function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject("Reading file failed: " + err);
            }
            else {
                let json = JSON.parse(data);
                resolve(json);
            }
        });
    });
}

function fetchStudent (studentId) {
    return new Promise((resolve, reject) => {
        readJsonFile('./data/student.json').then(students => {
            students = students.filter(s => s.studentId === studentId);
            if (students.length > 0) {
                delete students[0].password;
                resolve(students[0]);
            }
            else {
                reject("No records found");
            }
        });
    });
}

function getCourses (courseIds) {
    return new Promise((resolve, reject) => {
        readJsonFile('./data/course.json').then(courses => {
            courses = courses.filter(c => courseIds.indexOf(c.crn) >= 0);
            //console.log(courses);
            resolve(courses);
        });
    });
}

function getCourseInstructor (course) {
    return new Promise((resolve, reject) => {
        readJsonFile('./data/staff.json').then(instructors => {
            course.instructor = instructors.filter(i => i.staffNo === course.instructorId)[0];
            delete course.instructor.password;
            resolve(course);
        });
    });
}

// create a new "async" function so we can use the "await" keyword
async function getStudent(studentId) {
    let student = await fetchStudent(studentId);
    let courses = await getCourses(student.courseIds);
    courses = await Promise.all(courses.map(getCourseInstructor));
    student.courses = courses;
    return student;
}

let studentId = 2015001;
getStudent(studentId).then(student => {
    //Displays a pretty-printed multiline JSON representation indented with 2 spaces
    console.log(JSON.stringify(student, null, 2));
});