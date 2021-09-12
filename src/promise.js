/*
  ------------------------------------------------------------------------------
  Resolves promises sequentially
  Borrowed from: https://hackernoon.com/functional-javascript-resolving-promises-sequentially-7aac18c4431e

  @param {Function} fns [multiple] Promise functions to work with
  @return {Promise}
*/

const serialPromises = (...fns) => {
  return fns.reduce(
    (promise, fn) =>
      promise.then((result) => fn().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  )
}

/*
  ------------------------------------------------------------------------------
*/

export default serialPromises
