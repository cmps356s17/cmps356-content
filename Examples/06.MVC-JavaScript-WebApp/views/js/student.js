const studentTemplate =`
    <h4>Selected Student:</h4>
    <table class="table table-striped">
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
`

//When the document is loaded in the browser then listen to studentsDD on change event
document.addEventListener("DOMContentLoaded", () => {
    console.log("js-DOM fully loaded and parsed");
    document.querySelector('#studentsDD').addEventListener("change", onStudentChange)
})

/*
//jQuery way
$(document).ready( () => {
    console.log("jQuery -DOM fully loaded and parsed");
    $("#studentsDD").on('change', onStudentChange)
})
*/

async function getStudent(studentId) {
    const url = `/api/students/${studentId}`
    const response = await fetch(url)
    return await response.json()
}

async function onStudentChange(e) {
    //this refers to the html element that raised the event (i.e., studentsDD element)
    const selectedStudentId = this.value //jQuery will be $(this).val()

    if (selectedStudentId == "") {
        //Empty the student details div
        document.querySelector('#studentDetails').innerHTML = ''
        //$('#studentDetails').empty()
        return
    }

    console.log("onStudentChange.selectedStudentId:", selectedStudentId)

    try {
        const student = await getStudent(selectedStudentId)
        const htmlTemplate = Handlebars.compile(studentTemplate)
        const htmlContent = htmlTemplate(student)

        document.querySelector('#studentDetails').innerHTML = htmlContent
        //$('#studentDetails').html(htmlContent)
    }
    catch (err) {
        console.log(err)
    }
}

    //Much better to use a UI template to generate the UI
    //This will be ignored!!
    /*
    const studentTable = $("#studentTable")
    studentTable.empty()

    const row = $('<tr/>')
    row.append($('<td/>').html('StudentId'))
    row.append($('<td/>').html(student.studentId))
    studentTable.append(row)

    row = $('<tr/>')
    row.append($('<td/>').html('Name'))
    row.append($('<td/>').html(`${student.firstname} ${student.lastname}`))
    studentTable.append(row)

    row = $('<tr/>')
    row.append($('<td/>').html('Gender'))
    row.append($('<td/>').html(student.gender))
    studentTable.append(row)

    row = $('<tr/>')
    row.append($('<td/>').html('Program'))
    row.append($('<td/>').html(student.program))
    studentTable.append(row)

    row = $('<tr/>')
    row.append($('<td/>').html('GPA'))
    row.append($('<td/>').html(student.gpa))
    studentTable.append(row)

    
    row = $('<tr/>')
    row.append($('<td/>').html('Courses'))
    //row.append($('<td/>').html(student.courseIds.join(', ')))
    console.log("student.courses: ", student.courses)
    const coursesStr = student.courses.map(c => `${c.courseName} by ${c.instructor.firstname}`).join('<br>')
    row.append($('<td/>').html(coursesStr))
    studentTable.append(row)
    */   


/*
function getStudents() {
 const url = "/api/students"
 return fetch(url).then(response => response.json())
 }

function fillStudentsDD(students) {
    for(const student of students) {
        $("<option>", {
            value: student.studentId,
            text: student.name
        }).appendTo($("#studentsDD"))
    }
}
*/