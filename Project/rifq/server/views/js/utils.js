function getCookie(cookieName) {
  //console.log(document.cookie)

  let cookies = document.cookie.split(';')
  for(let cookie of cookies) {

    const cookieArray = cookie.split('=')
    const cname = cookieArray[0].trim()
    const cvalue = cookieArray[1].trim()

    if ( cookieName === cname ) {
      return cvalue
      break
    }
  }
  return ""
}
