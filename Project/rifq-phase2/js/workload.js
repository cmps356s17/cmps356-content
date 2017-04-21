//When the document is loaded in the browser then show the chart
document.addEventListener("DOMContentLoaded", () => {
    let ctx = document.querySelector("#effortHoursChart")
    Chart.defaults.global.legend.display = false

    let effortHoursChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["CMPS 261", "CMPS 151"],
            datasets: [{
                label: 'Effort Hours',
                data: [42, 15],
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
                        beginAtZero: true
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
})