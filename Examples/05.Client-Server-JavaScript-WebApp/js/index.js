'use strict'
$(document).ready(function () {
    $('#submitBtn').on('click', submitForm);
});

function submitForm(event) {
    event.preventDefault();

    let userInfo = {
        username: $('#username').val(),
        requestedPage: $('#requestedPage').val(),
    };
    console.log("submitForm.userInfo", userInfo);

    let url = "http://localhost:9080/";

    fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    }).then(response => response.json())
        .then(user => {
            console.log("Redirect to:", user.redirectTo);
            //store the userInfo in the localStorage so it is available to other pages
            localStorage.user = JSON.stringify(user);
            
            window.location = user.redirectTo;
    });
}