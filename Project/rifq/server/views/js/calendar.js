let events = []

document.addEventListener("DOMContentLoaded", async () => {
  const userId = getCookie('userId')
  let tasks = await fetch(`/api/courses/${userId}/calendar`)
  tasks = await tasks.json()

  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    },
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: tasks,
    timezone: 'local'
  })
  syncCalendar(tasks)
})

function syncToGoogleCalendar() {
    toggleButton(true)
    console.log(syncIcon.classList)

    let isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
    if (!isSignedIn)
        gapi.auth2.getAuthInstance().signIn()
    else
        updateSigninStatus(isSignedIn)// If user is signed in, makeApiCall through the listener callback
}

function toggleButton(isSync) {
    let syncIcon = document.getElementById('syncIcon')
    let syncButton = document.getElementById('syncButton')
    syncIcon.classList.toggle('glyphicon-ok', !isSync)
    syncIcon.classList.toggle('glyphicon-refresh', isSync)
    syncButton.classList.toggle('btn-primary', isSync)
    syncButton.classList.toggle('btn-success', !isSync)
    syncIcon.classList.toggle('gly-spin', isSync)
}

function updateSigninStatus(isSignedIn) {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
        gapi.client.load('calendar', 'v3', makeApiCall)
    }
}


async function makeApiCall() {
    let response = await gapi.client.calendar.calendarList.list({})
    let calendars = response.result.items
    let calendar = calendars.find((c) => c.summary == "RIFQ Tasks")
    if (calendar) {
        // If the calendar already exists, remove it in order to prevent duplication of events
        console.log("Calendar Already Exists")
        await gapi.client.calendar.calendars.delete({calendarId: calendar.id})
    }
    response = await gapi.client.calendar.calendars.insert({
        "summary": "RIFQ Tasks",
        "timeZone": "Asia/Qatar"
    })
    // for( let event of events)
    //     await insertEvent(event, response.result.id)
    let batch = gapi.client.newBatch()
    events.forEach(event => {
        console.log("Adding event")
        batch.add(gapi.client.calendar.events.insert({
            "calendarId": response.result.id,
            "resource": event
        }))
    })
    await batch
    console.log('loop is over')
    toggleButton(false)
}

function start() {
    let SCOPES = "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar"
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
        // clientId and scope are optional if auth is not required.
        'clientId': '214636219780-mjuvssnumq1j22c28m5ag72sln83dfj2.apps.googleusercontent.com',
        'scope': SCOPES,
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

        // Handle the initial sign-in state.

    })
}

// 1. Load the JavaScript client library.
function syncCalendar(data) {
    data.forEach(elem => {
        let date = elem.start
        let event = {
            "end": {
                "date": date
            },
            "start": {
                "date": date
            },
            "summary": elem.title
        }
        events.push(event)
    })

    gapi.load('client:auth2', start)
}
