/*
  ------------------------------------------------------------------------------
  Finds cookie by name and returns its value
  Borrowed from: https://gomakethings.com/working-with-cookies-in-vanilla-js/

  @param {String} Name of cookie to retrieve
  @return {String} Value of cookie
*/

const getCookieValue = (name) => {
  const value = `; ` + document.cookie
  const parts = value.split(`; ` + name + `=`)
  if (parts.length == 2) return parts.pop().split(`;`).shift()
  else return ``
}

/*
  ------------------------------------------------------------------------------
*/

export { getCookieValue }
