//When the document is loaded in the browser then fill the students dropdown.
$(document).ready(function(){
    getStudents().then(students => fillStudentsDD(students))
        .catch(err => console.log(err));

    $("#studentsDD").on('change', onStudentChange);
});

function getStudents() {
    let url = "../data/student.json";
    return fetch(url).then(response => {
        console.log(response);
        return response.json()
    } );
}

function getCourses (courseIds) {
    let url = "../data/course.json";
    return fetch(url).then(response => response.json())
        .then(courses => {
            courses = courses.filter(c => courseIds.indexOf(c.crn) >= 0);
            return courses;
        });
}

function getCourseInstructor (course) {
    let url = "../data/staff.json";
    return fetch(url).then(response => response.json())
        .then(instructors => {
            course.instructor = instructors.filter(i => i.staffNo === course.instructorId)[0];
            return course;
        });
}

function onStudentChange() {
    let selectedStudentId = $(this).val();
    let student;

    getStudents().then(students => {
        student = students.filter(s => s.studentId == selectedStudentId)[0];
        return getCourses(student.courseIds);
    }).then(courses => {
        //For each course get the instructor
        return Promise.all(courses.map(getCourseInstructor));
    }).then(coursesWithInstructor => {
        student.courses = coursesWithInstructor;
        displayStudent(student);
    }).catch(err => console.log(err));
}


function fillStudentsDD(students) {
    for(let student of students) {
        $("<option>", {
            value: student.studentId,
            text: `${student.studentId} - ${student.firstname} ${student.lastname}`
        }).appendTo("#studentsDD")
    }
}

function displayStudent(student) {
    let studentTable = $("#studentDetails");
    studentTable.empty();

    let row = $('<tr>');
    row.append($('<td>').html('StudentId'));
    row.append($('<td>').html(student.studentId));
    studentTable.append(row);

    row = $('<tr>');
    row.append($('<td>').html('Name'));
    row.append($('<td>').html(`${student.firstname} ${student.lastname}`));
    studentTable.append(row);

    row = $('<tr>');
    row.append($('<td>').html('Gender'));
    row.append($('<td>').html(student.gender));
    studentTable.append(row);

    row = $('<tr>');
    row.append($('<td>').html('Program'));
    row.append($('<td>').html(student.program));
    studentTable.append(row);

    row = $('<tr>');
    row.append($('<td>').html('GPA'));
    row.append($('<td>').html(student.gpa));
    studentTable.append(row);

    
    row = $('<tr>');
    row.append($('<td>').html('Courses'));
    //row.append($('<td>').html(student.courseIds.join(', ')));
    console.log("student.courses: ", student.courses);
    let coursesStr = student.courses.map(c => `${c.courseName} by ${c.instructor.firstname}`).join('<br>');
    row.append($('<td>').html(coursesStr));
    studentTable.append(row);
}