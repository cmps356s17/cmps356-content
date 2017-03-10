let fs = require('fs-promise');

async function getStudent(studentId) {
    let data = await fs.readFile('./data/student.json');
    let students = JSON.parse(data);
    let student = students.find(s => s.studentId === studentId);
    if (student != "undefined") {
        return student;
    }
    else {
        throw new Error("No records found");
    }
}

async function getCourses(courseIds) {
    let data = await fs.readFile('./data/course.json');
    let courses = JSON.parse(data);
    courses = courses.filter(c => courseIds.indexOf(c.crn) >= 0);
    //console.log(courses);
    return courses;
}

async function getCourseInstructor(course) {
    let data = await fs.readFile('./data/staff.json');
    let instructors = JSON.parse(data);
    course.instructor = instructors.filter(i => i.staffNo === course.instructorId)[0];
    delete course.instructor.password;
    return course;
}

// create a new "async" function so we can use the "await" keyword
async function getStudentCourses(studentId) {
    let student = await getStudent(studentId);
    let courses = await getCourses(student.courseIds);
    //Get instructor details for each course
    courses = await Promise.all(courses.map(getCourseInstructor));
    student.courses = courses;
    return student;
}

let studentId = 2015002;
getStudentCourses(studentId)
    .then( student =>  console.log( JSON.stringify(student, null, 2) ) )
    .catch( err => console.log(err) );

//JSON.stringify(student, null, 2) is used to display a pretty-printed multiline JSON representation indented with 2 spaces