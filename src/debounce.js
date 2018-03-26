/*
  ------------------------------------------------------------------------------
  Debounces execution of a function.
  Borrowed from: https://medium.com/@_jh3y/throttling-and-debouncing-in-javascript-b01cad5c8edf
*/

const debounce = (delay, func) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

/*
  ------------------------------------------------------------------------------
*/

export default debounce
