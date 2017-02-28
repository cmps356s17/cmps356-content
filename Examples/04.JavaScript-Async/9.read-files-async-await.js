let getStudent = (() => {
    var _ref = _asyncToGenerator(function* (studentId) {
        let data = yield fs.readFile('./data/student.json');
        let students = JSON.parse(data);
        students = students.filter(function (s) {
            return s.studentId === studentId;
        });
        if (students.length > 0) {
            delete students[0].password;
            return students[0];
        } else {
            throw new Error("No records found");
        }
    });

    return function getStudent(_x) {
        return _ref.apply(this, arguments);
    };
})();

let getCourses = (() => {
    var _ref2 = _asyncToGenerator(function* (courseIds) {
        let data = yield fs.readFile('./data/course.json');
        let courses = JSON.parse(data);
        courses = courses.filter(function (c) {
            return courseIds.indexOf(c.crn) >= 0;
        });
        //console.log(courses);
        return courses;
    });

    return function getCourses(_x2) {
        return _ref2.apply(this, arguments);
    };
})();

let getCourseInstructor = (() => {
    var _ref3 = _asyncToGenerator(function* (course) {
        let data = yield fs.readFile('./data/staff.json');
        let instructors = JSON.parse(data);
        course.instructor = instructors.filter(function (i) {
            return i.staffNo === course.instructorId;
        })[0];
        delete course.instructor.password;
        return course;
    });

    return function getCourseInstructor(_x3) {
        return _ref3.apply(this, arguments);
    };
})();

// create a new "async" function so we can use the "await" keyword


let getStudentCourses = (() => {
    var _ref4 = _asyncToGenerator(function* (studentId) {
        let student = yield getStudent(studentId);
        let courses = yield getCourses(student.courseIds);
        //Get instructor details for each course
        courses = yield Promise.all(courses.map(getCourseInstructor));
        student.courses = courses;
        return student;
    });

    return function getStudentCourses(_x4) {
        return _ref4.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let fs = require('fs-promise');

let studentId = 2015002;
getStudentCourses(studentId).then(student => console.log(JSON.stringify(student, null, 2))).catch(err => console.log(err));

//JSON.stringify(student, null, 2) is used to display a pretty-printed multiline JSON representation indented with 2 spaces
//# sourceMappingURL=9.read-files-async-await.js.map