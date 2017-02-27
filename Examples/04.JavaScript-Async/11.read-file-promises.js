'use strict'
let fs = require('fs');

//Read a file and convert its content to a json object
function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (error, data) => {
            if (error) {
                reject("Reading file failed: " + error);
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

let student, studentId = 2015001;
fetchStudent(studentId).then(aStudent => {
    student = aStudent;
    return getCourses (student.courseIds);
}).then(courses => {
    return Promise.all(courses.map(getCourseInstructor));
}).then(courses => {
    student.courses = courses;
    //Displays a pretty-printed multiline JSON representation indented with 2 spaces
    console.log(JSON.stringify(student, null, 2));
}).catch( error => {
    console.log(error);
});
