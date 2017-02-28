

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
let getStudentCourses = (() => {
    var _ref = _asyncToGenerator(function* (studentId) {
        let student = yield getStudent(studentId);
        let courses = yield getCourses(student.courseIds);
        courses = yield Promise.all(courses.map(getCourseInstructor));
        student.courses = courses;
        return student;
    });

    return function getStudentCourses(_x) {
        return _ref.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let fs = require('fs-promise');

function getStudent(studentId) {
    return fs.readFile('./data/student.json').then(data => {
        let students = JSON.parse(data);
        students = students.filter(s => s.studentId === studentId);
        if (students.length > 0) {
            delete students[0].password;
            return students[0];
        } else {
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

let studentId = 2015001;
getStudentCourses(studentId).then(student => {
    //Displays a pretty-printed multiline JSON representation indented with 2 spaces
    console.log(JSON.stringify(student, null, 2));
});
