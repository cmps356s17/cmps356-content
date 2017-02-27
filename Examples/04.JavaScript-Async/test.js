'use strict';
let fs = require('fs');

function getStudent(studentId) {
    return new Promise(resolve, reject)
    {
        let filePath = './data/student.json';
        fs.readFile(filePath, (err, data) => {
            if (err)  reject(err);
            else {
                let students = JSON.parse(data);
                students = students.filter(s => s.studentId === studentId);
                reslove(students[0]);
            }
        });
    }
}

function getCourses(studentId, callback) {
    let filePath = './data/course.json';
    fs.readFile(filePath, (err, data) => {
        if (err)  callback(err);
        else {
            let courses = JSON.parse(data);
            //students = students.filter(s => s.studentId === studentId);
            callback(null, courses);
        }
    });
}

let student;
let courses;

getStudent(2015001).then(student => {
    console.log(student);
    return getCourses(student.studentId);
}).then (courses => {

}).catch(err => {
    console.log(student);
})

getStudent(2015001, function (err, data) {
    student = data;
    getCourses(student.studentId, function (err, data) {
        courses = data;
        student.courses = courses;
        console.log(student);
    });
});

console.log('Enjoy...!!!!');


