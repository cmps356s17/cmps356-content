'use strict';

require("babel-polyfill");
var fs = require('fs');

//Read a file and convert its content to a json object
function readJsonFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                reject("Reading file failed: " + err);
            } else {
                var json = JSON.parse(data);
                resolve(json);
            }
        });
    });
}

function fetchStudent(studentId) {
    return new Promise(function (resolve, reject) {
        readJsonFile('./data/student.json').then(function (students) {
            students = students.filter(function (s) {
                return s.studentId === studentId;
            });
            if (students.length > 0) {
                delete students[0].password;
                resolve(students[0]);
            } else {
                reject("No records found");
            }
        });
    });
}

function getCourses(courseIds) {
    return new Promise(function (resolve, reject) {
        readJsonFile('./data/course.json').then(function (courses) {
            courses = courses.filter(function (c) {
                return courseIds.indexOf(c.crn) >= 0;
            });
            //console.log(courses);
            resolve(courses);
        });
    });
}

function getCourseInstructor(course) {
    return new Promise(function (resolve, reject) {
        readJsonFile('./data/staff.json').then(function (instructors) {
            course.instructor = instructors.filter(function (i) {
                return i.staffNo === course.instructorId;
            })[0];
            delete course.instructor.password;
            resolve(course);
        });
    });
}

// create a new "async" function so we can use the "await" keyword
function getStudent(studentId) {
    var student, courses;
    return regeneratorRuntime.async(function getStudent$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(fetchStudent(studentId));

                case 2:
                    student = _context.sent;
                    _context.next = 5;
                    return regeneratorRuntime.awrap(getCourses(student.courseIds));

                case 5:
                    courses = _context.sent;
                    _context.next = 8;
                    return regeneratorRuntime.awrap(Promise.all(courses.map(getCourseInstructor)));

                case 8:
                    courses = _context.sent;

                    student.courses = courses;
                    return _context.abrupt('return', student);

                case 11:
                case 'end':
                    return _context.stop();
            }
        }
    }, null, this);
}

var studentId = 2015001;
getStudent(studentId).then(function (student) {
    //Displays a pretty-printed multiline JSON representation indented with 2 spaces
    console.log(JSON.stringify(student, null, 2));
});
