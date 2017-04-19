//When the document is loaded in the browser then show the calendar
document.addEventListener("DOMContentLoaded", () => {

    $('#calendarDiv').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        defaultDate: '2017-04-17',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'CMPS 356 Homework-2',
                start: '2017-04-01',
                end: '2017-04-03'
            },
            {
                title: 'CMPS 356 Quiz-1',
                start: '2017-05-09T16:00:00'
            },
            {
                title: 'CMPS 356 Midterm-2',
                start: '2017-04-09T18:00:00',
                end: '2017-04-09T20:00:00'
            },
            {
                title: 'CMPS 356 Project',
                start: '2017-04-09T18:00:00'
            }

        ]
    })
})
