const taskTemplate = `
<table id="tasksTable" class="table table-striped table-bordered dataTable" name="tasks">
    <thead>
    <tr>
        <th>Course</th>
        <th>Task Type</th>
        <th>Title</th>
        <th>Deadline</th>
        <th>Effort Hours</th>
        <th>Weight</th>
        {{#if user.isFaculty}}
          <th>Action</th>
        {{/if}}
    </tr>
    </thead>
    <tbody>
      {{#courseTasks}}
        {{#tasks}}
            <tr data-taskid="{{id}}">
                <td  class="courseName">{{../code}} - {{../name}}</td>
                <td class="taskType">{{taskType}}</td>
                <td class="title">{{title}}</td>
                <td class="dueDate">{{dueDate}}</td>
                <td class="effortHours">{{effortHours}}</td>
                <td class="weight">{{weight}}</td>
                {{#if ../../user.isFaculty}}
                <td>
                    <a href="/courses/{{../../user.id}}/{{../crn}}/tasks/{{id}}" class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-pencil"></i></a>
                    <button onclick="deleteTask({{../crn}}, {{id}})" class="btn btn-sm btn-danger"><i class="glyphicon glyphicon-trash"></i></button>
                </td>
                {{/if}}
            </tr>
        {{/tasks}}
      {{/courseTasks}}
    </tbody>
</table>
`
document.addEventListener("DOMContentLoaded", () => {
    getTasks("all")
})

async function getTasks(crn) {
  const userId = getCookie('userId')
  const userType = getCookie('userType')
  const user = {id : userId, isFaculty : (userType === "Faculty")}

  let courseTasks = await fetch(`/api/courses/${userId}/${crn}/tasks`)
  courseTasks = await courseTasks.json()
  const compiledTemplate = Handlebars.compile(taskTemplate)
  document.querySelector('#tasksDiv').innerHTML = compiledTemplate({courseTasks, user })
}

async function deleteTask(crn, taskId) {
  // Ask the user to confirm. If they cancel the request then exit this function
  if (!confirm('Confirm delete?')) {
    return
  }

  //Get the data-taskId custom attribute associated with the clicked Link
  //Note this refers to the link that was clicked (i.e., the source of the click event)
  try {
    console.log("deleteTask.taskId: ", taskId)

    let url = `/api/courses/${crn}/tasks/${taskId}`
    console.log("deleteTask.taskId", taskId)

    await fetch(url, {method: 'delete'})

    //After successful delete remove the row from the HTML table
    //This line should be after fetch but it does not work if I do so
    //$(this).closest('tr').remove()
    //this.parentNode.parentNode.removeChild()
    const tasksTable = document.querySelector(`#tasksTable tbody`)
    const trToDelete = tasksTable.querySelector(`tr[data-taskid="${taskId}"]`)
    console.log(tasksTable, trToDelete)

    tasksTable.removeChild(trToDelete)
  }
  catch (err) {
    console.log(err)
  }
}
