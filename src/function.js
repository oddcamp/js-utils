/*
  ------------------------------------------------------------------------------
  Throttles execution of a function.
  Borrowed from: https://medium.com/@_jh3y/throttling-and-debouncing-in-javascript-b01cad5c8edf
*/

const throttle = (delay, fn) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      fn.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, delay)
    }
  }
}

/*
  ------------------------------------------------------------------------------
  Debounces execution of a function.
  Borrowed from: https://medium.com/@_jh3y/throttling-and-debouncing-in-javascript-b01cad5c8edf
*/

const debounce = (delay, fn) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => fn.apply(context, args), delay)
  }
}

/*
  ------------------------------------------------------------------------------
*/

export {
  throttle,
  debounce,
}
