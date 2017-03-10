'use strict'
//When the document is loaded in the browser then fill the students dropdown.
$(document).ready(function(){
    getStudents().then(students => fillStudentsDD(students))
        .catch(err => console.log(err));

    $("#studentsDD").on('change', onStudentChange);
});

function getStudents() {
    let url = "http://localhost:9080/api/students";
    return fetch(url).then(response => response.json());
}

function getStudent(studentId) {
    let url = `http://localhost:9080/api/students/${studentId}`;
    return fetch(url).then(response => response.json());
}

function onStudentChange() {
    let selectedStudentId = $(this).val();

    getStudent(selectedStudentId).then(student => {
        displayStudent(student);
    }).catch(err => console.log(err));
}

function fillStudentsDD(students) {
    for(let student of students) {
        $("<option>", {
            value: student.studentId,
            text: student.name
        }).appendTo($("#studentsDD"))
    }
}

function displayStudent(student) {

     let htmlTemplate = $('#student-template').html(),
     studentTemplate = Handlebars.compile(htmlTemplate)

     console.log('studentTemplate(student)', studentTemplate(student));

     $('#studentDetails').html(studentTemplate(student));

    //Much better to use a UI template to generate the UI
    //This will be ignored!!
    /*
    let studentTable = $("#studentTable");
    studentTable.empty();

    let row = $('<tr/>');
    row.append($('<td/>').html('StudentId'));
    row.append($('<td/>').html(student.studentId));
    studentTable.append(row);

    row = $('<tr/>');
    row.append($('<td/>').html('Name'));
    row.append($('<td/>').html(`${student.firstname} ${student.lastname}`));
    studentTable.append(row);

    row = $('<tr/>');
    row.append($('<td/>').html('Gender'));
    row.append($('<td/>').html(student.gender));
    studentTable.append(row);

    row = $('<tr/>');
    row.append($('<td/>').html('Program'));
    row.append($('<td/>').html(student.program));
    studentTable.append(row);

    row = $('<tr/>');
    row.append($('<td/>').html('GPA'));
    row.append($('<td/>').html(student.gpa));
    studentTable.append(row);

    
    row = $('<tr/>');
    row.append($('<td/>').html('Courses'));
    //row.append($('<td/>').html(student.courseIds.join(', ')));
    console.log("student.courses: ", student.courses);
    let coursesStr = student.courses.map(c => `${c.courseName} by ${c.instructor.firstname}`).join('<br>');
    row.append($('<td/>').html(coursesStr));
    studentTable.append(row);
    */   
}