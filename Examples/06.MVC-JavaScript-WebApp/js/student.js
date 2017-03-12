let htmlTemplate =`
    <h4>Selected Student:</h4>
    <table border="1">
        <tbody>
        <tr>
            <td>StudentId</td>
            <td>{{studentId}}</td>
        </tr>
        <tr>
            <td>Name</td>
            <td>{{firstname}} {{lastname}}</td>
        </tr>
        <tr>
            <td>Gender</td>
            <td>{{gender}}</td>
        </tr>
        <tr>
            <td>Program</td>
            <td>{{program}}</td>
        </tr>
        <tr>
            <td>GPA</td>
            <td>{{gpa}}</td>
        </tr>
        <tr>
            <td>Course Ids</td>
            <td>{{courseIds}}</td>
        </tr>

        <tr>
            <td>Courses</td>
            <td>
                <ul>
                    {{#each courses}}
                        <li>{{courseCode}} - {{courseName}} by {{instructor.firstname}} {{instructor.lastname}}</li>
                    {{/each}}
                </ul>
            </td>
        </tr>
        </tbody>
    </table>
`;


//When the document is loaded in the browser then fill the students dropdown.
$(document).ready( () => {
    /*    getStudents().then(students => fillStudentsDD(students))
        .catch(err => console.log(err));*/

    $("#studentsDD").on('change', onStudentChange);
});

function getStudent(studentId) {
    let url = `http://localhost:9080/api/students/${studentId}`;
    return fetch(url).then(response => response.json());
}

async function onStudentChange() {
    let selectedStudentId = $(this).val();
    if (selectedStudentId == "") {
        $('#studentDetails').empty();
        return;
    }

    console.log("onStudentChange.selectedStudentId:", selectedStudentId);

    try {
        let student = await getStudent(selectedStudentId);
        displayStudent(student);
    }
    catch (err) {
        console.log(err)
    }
}

function displayStudent(student) {

     //let htmlTemplate = $('#student-template').html(),
     let studentTemplate = Handlebars.compile(htmlTemplate);
     let htmlContent = studentTemplate(student);

     //console.log('studentTemplate(student)', htmlContent);

     $('#studentDetails').html(htmlContent);

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


/*
function getStudents() {
 let url = "http://localhost:9080/api/students";
 return fetch(url).then(response => response.json());
 }

function fillStudentsDD(students) {
    for(let student of students) {
        $("<option>", {
            value: student.studentId,
            text: student.name
        }).appendTo($("#studentsDD"))
    }
}
*/