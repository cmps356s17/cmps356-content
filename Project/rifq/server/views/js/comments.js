let commentTemplate = `
  <table class="table table-striped table-bordered dataTable">
      <thead>
          <tr>
              <th>Course</th>
              <th>Title</th>
              <th>Comment</th>
              <th>Created By</th>
              <th>Created Date</th>
          </tr>
      </thead>
      <tbody>
        {{#courseComments}}
            {{#comments}}
                <tr>
                    <td>{{../code}} - {{../name}}</td>
                    <td>{{title}}</td>
                    <td>{{body}}</td>
                    <td>{{createdBy}}</td>
                    <td>{{createdDate}}</td>
                </tr>
            {{/comments}}
         {{/courseComments}}
        </tbody>
  </table>
`

document.addEventListener("DOMContentLoaded", () => {
    getComments("all")
})

async function getComments(crn) {
  const userId = getCookie('userId')
  let courseComments = await fetch(`/api/courses/${userId}/${crn}/comments`)
  courseComments = await courseComments.json()
  const compiledTemplate = Handlebars.compile(commentTemplate)
  document.querySelector('#commentsList').innerHTML = compiledTemplate({courseComments})
}
