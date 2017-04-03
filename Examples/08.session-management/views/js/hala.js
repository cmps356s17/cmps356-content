$(document).ready(function () {
    let cookies = document.cookie
    let accessCount = getCookie('accessCount')
    console.log('accessCount', accessCount)
    if (accessCount <= 3) {
        $('#halaDiv').show()
    } else {
        $('#noHalaDiv').show()
    }
    $('.visitCount').html(accessCount)
})

function getCookie(cookieName) {
    let cookies = document.cookie.split(';')
    for(let cookie of cookies) {

        let cookieArray = cookie.split('=')
        let cname = cookieArray[0].trim()
        let cvalue = cookieArray[1].trim()

        if ( cookieName === cname ) {
            return cvalue
            break
        }
    }
    return ""
}