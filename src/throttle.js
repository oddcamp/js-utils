/*
  Throttle execution of a function.

  Borrowed from: https://medium.com/@_jh3y/throttling-and-debouncing-in-javascript-b01cad5c8edf

  Example:

    window.addEventListener('resize', throttle(500, () => {
      // do something expensive here
    }));
*/

const throttle = (limit, func) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export default throttle
