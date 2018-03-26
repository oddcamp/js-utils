/*
  ------------------------------------------------------------------------------
  Resolves promises sequentially
  Borrowed from: https://hackernoon.com/functional-javascript-resolving-promises-sequentially-7aac18c4431e
*/

const serialPromises = (...funcs) => {

  return funcs.reduce(
    (promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([])
  )

}

/*
  ------------------------------------------------------------------------------
*/

export default serialPromises
