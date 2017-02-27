'use strict'
let fs = require('fs');

//Read a file and convert its content to json
function readJsonFile(filePath, callback) {
    fs.readFile(filePath, (err, data) => {
        if (err) callback(err);
        else callback(null, JSON.parse(data));
    });
}

function fetchStudent (studentId, callback) {
    readJsonFile('./data/student.json', function (err, students) {
        if (err) {
            callback(err);
            return;
        }

        students = students.filter(s => s.studentId === studentId);
        if (students.length > 0) {
            delete students[0].password;
            callback(null, students[0]);
        }
        else {
            callback(new Error("No records found"));
        }
    });
}

function getCourses (courseIds, callback) {
    readJsonFile('./data/course.json', function (err, courses) {
        if (err) {
            callback(err);
            return;
        }

        courses = courses.filter(c => courseIds.indexOf(c.crn) >= 0);
        //console.log(courses);
        callback(null, courses);
    });
}

function getCourseInstructor (course, callback) {
    readJsonFile('./data/staff.json', function (err, instructors) {
        if (err) {
            callback(err);
            return;
        }
        course.instructor = instructors.filter(i => i.staffNo === course.instructorId)[0];
        delete course.instructor.password;
        callback(null, course);
    });
}

// create a new "async" function so we can use the "await" keyword
function getStudent(studentId, callback) {
    let student;

    fetchStudent(studentId, function (err, aStudent) {
        student = aStudent;
        getCourses(student.courseIds, function (err, courses) {
            student.courses = courses;
            for (let course of student.courses) {
                getCourseInstructor(course, function (err, aCourse) {
                    course = aCourse;
                });
            }

            callback(null, student);
        });
    });
}

let studentId = 2015001;
getStudent(studentId, function(err, student) {
    //Displays a pretty-printed multiline JSON representation indented with 2 spaces
    console.log(JSON.stringify(student, null, 2));
});