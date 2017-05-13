async function getTaskTitle(doNotUpdateTaskTitle) {
  const crn = document.querySelector("#crn").value
  const taskType = document.querySelector("#taskType").value

  if (!crn || !taskType) {
    return false
  }

  const crnBeforeUpdate = document.querySelector("#crnBeforeUpdate").value
  const taskTypeBeforeUpdate = document.querySelector("#taskTypeBeforeUpdate").value

  //Skip the validation if CRN and task type did not change
  if (crn == crnBeforeUpdate && taskType == taskTypeBeforeUpdate) {
    return true
  }

  let tasksCount = await fetch(`/api/courses/${crn}/${taskType}/count`)
  tasksCount = await tasksCount.json()

  const taskTypeDD = document.querySelector("#taskType")
  const taskTypeText = taskTypeDD.options[taskTypeDD.selectedIndex].text
  const maxTasks = taskTypeDD.options[taskTypeDD.selectedIndex].dataset.max
  console.log(tasksCount, "maxTasks", maxTasks)

  if (!doNotUpdateTaskTitle) {
    document.querySelector("#title").value = `${taskTypeText} ${tasksCount.count + 1}`
  }

  if (tasksCount.count >= maxTasks) {
    const errorMsg = `Cannot have more than ${maxTasks} ${taskTypeText}`
    document.querySelector("#errorMsg").innerText = errorMsg
    document.querySelector("#alertBox").style.display = ''
    taskTypeDD.setCustomValidity(errorMsg)
    return false
  } else {
    document.querySelector("#alertBox").style.display = 'none'
    taskTypeDD.setCustomValidity('')
    return true
  }
}

async function validateForm() {
  const doNotUpdateTaskTitle = true
  let isValid = await getTaskTitle(doNotUpdateTaskTitle)
  console.log("isValid", isValid)

  if (!isValid) {
    return false
  }

  const dueDateInput = document.querySelector("#dueDate")
  let dueDate = dueDateInput.value
  dueDate = new Date(dueDate)
  const today = new Date()

  if (dueDate < today) {
    dueDateInput.setCustomValidity("Task due date should be greater than or equal to today")
    return false
  } else {
    dueDateInput.setCustomValidity("")
    return true
  }
}
