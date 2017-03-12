document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#submitBtn').onclick = submitForm;
});

/*
// Or you can use jQuery to achieve the same thing
$(document).ready(function () {
    $('#submitBtn').on('click', submitForm);
});
*/

async function submitForm(event) {

    const loginForm = document.querySelector( "form" );

    const isValid = loginForm.checkValidity();
    if (!isValid) {
        return;
    }

    //Do not let the browser submit the form but we will do so by script
    event.preventDefault();

    const userInfo = {
        username: document.querySelector('#username').value,
        requestedPage: document.querySelector('#requestedPage').value
    };

    console.log("submitForm.userInfo", userInfo);

    const url = "http://localhost:9080/";

    let response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    });

    const user = await response.json();
    console.log("Redirect to: ", user.redirectTo);

    //store the userInfo in the localStorage so it is available to other pages
    localStorage.user = JSON.stringify(user);

    //Change the Url
    window.location = user.redirectTo;
}