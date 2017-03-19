'use strict'
$(document).ready(function () {
    let cookies = document.cookie;
    let accessCount = getCookie('accessCount');
    console.log('accessCount', accessCount);
    if (accessCount <= 3) {
        $('#halaDiv').show();
    } else {
        $('#noHalaDiv').show();
    }
    $('.visitCount').html(accessCount);
});

function getCookie(cname) {
    var name = cname + "=";
    var cookies = document.cookie.split(';');
    for(let cookie of cookies) {
        //remove in leading empty spaces
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}