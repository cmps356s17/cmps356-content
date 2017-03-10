'use strict'

class StudentRepository {
    constructor() {
        this.fs = require('fs');  
    }
    
    getStudents() {
        return new Promise((resolve, reject) => {
            this.readJsonFile('./data/student.json').then(students => {
                //Only return the student Id and names
                students = students.map(s => {
                    return {
                        studentId: s.studentId,
                        name: `${s.studentId} - ${s.firstname} ${s.lastname}`
                    }
                });
                resolve(students);
            }).catch(err => {
                reject(err);
            });
        });
    }
    
    //Read a file and convert its content to a json object
    readJsonFile(filePath) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(filePath, (error, data) => {
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

    fetchStudent(studentId) {
        return new Promise((resolve, reject) => {
            this.readJsonFile('./data/student.json').then(students => {
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

    getCourses(courseIds) {
        return new Promise((resolve, reject) => {
            this.readJsonFile('./data/course.json').then(courses => {
                courses = courses.filter(c => courseIds.indexOf(c.crn) >= 0);
                resolve(courses);
            });
        });
    }

    getCourseInstructor(course) {
        return new Promise((resolve, reject) => {
            this.readJsonFile('./data/staff.json').then(instructors => {
                course.instructor = instructors.filter(i => i.staffNo === course.instructorId)[0];
                delete course.instructor.password;
                resolve(course);
            });
        });
    }

    getStudent(studentId) {
        let student;
        return new Promise((resolve, reject) => {
            this.fetchStudent(studentId).then(aStudent => {
                student = aStudent;
                console.log(student);
                return this.getCourses(student.courseIds);
            }).then(courses => {
                return Promise.all(courses.map(course => this.getCourseInstructor(course)));
            }).then(courses => {
                student.courses = courses;
                resolve(student);
            }).catch(err => {
                reject(err);
            })
        });
    }
}

module.exports = new StudentRepository();