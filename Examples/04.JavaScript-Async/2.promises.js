function displayStudents(students) {
    for(let student of students) {
        $("<li>", {
            text: `${student.studentId} - ${student.firstname} ${student.lastname}`
        }).appendTo($("#studentsList"))
    }
}

function getStudents() {
    let url = "data/student.json";
    return fetch(url).then(response => response.json());
}

//When the document is loaded in the browser then fill the students dropdown.
$(document).ready(function(){
    getStudents().then(students => displayStudents(students))
                 .catch(err => console.log(err));
});