document.addEventListener('DOMContentLoaded', function () {
    let elemCRNs = [...(document.querySelectorAll('table tr td:nth-child(1)'))]
    let courseCRNs = elemCRNs.map( row => row.innerHTML)

    let elemEffortHours = [...document.querySelectorAll('table tr td:nth-child(9)')]
    let effortHours = elemEffortHours.map( row => row.innerHTML)

    var ctx = document.getElementById("effortHoursChart")
    Chart.defaults.global.legend.display = false
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: courseCRNs,
            datasets: [{
                label: 'Effort Hours',
                data: effortHours,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(54, 162, 235, 0.5)'

                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)'

                ],
                borderWidth: 1
            }]
        },
        options: {

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: Math.max(...effortHours)
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Effort Hours'
                    }
                }],
                xAxes: [{

                    scaleLabel: {
                        display: true,
                        labelString: 'Courses'
                    }
                }]
            }
        }
    })
}, false)
