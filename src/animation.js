import { addEventListener, removeEventListener } from "./event.js"
import { getElements } from "./selector.js"

// local variables

const animationEventNames = {
  animation: `animationend`,
  OAnimation: `oAnimationEnd`,
  MozAnimation: `animationend`,
  WebkitAnimation: `webkitAnimationEnd`,
}
const transitionEventNames = {
  transition: `transitionend`,
  OTransition: `oTransitionEnd`,
  MozTransition: `transitionend`,
  WebkitTransition: `webkitTransitionEnd`,
}

let animationEventName = ``
let transitionEventName = ``

const el = document.createElement(`fakeelement`)
for (const e in animationEventNames) {
  if (el.style[e] !== undefined) {
    animationEventName = `${animationEventNames[e]}.onCssAnimationEnd`
    break
  }
}
for (const e in transitionEventNames) {
  if (el.style[e] !== undefined) {
    transitionEventName = `${transitionEventNames[e]}.onCssTransitionEnd`
    break
  }
}

// local functions

const onEnd = (
  type,
  elements,
  callback,
  { continuous = false, oncePerElems = true, oncePerAnims = true } = {}
) => {
  if (!oncePerAnims) {
    oncePerElems = false
  }

  elements = getElements(elements)
  const eventName =
    type == `animation` ? animationEventName : transitionEventName
  let animationsCountTotal = 0
  let animationsPassedTotal = 0

  elements.forEach((element) => {
    const animationsCount =
      (
        window
          .getComputedStyle(element)
          [
            type == `animation` ? `animation-name` : `transition-property`
          ].match(/,/g) || []
      ).length + 1

    let animationsPassed = 0
    animationsCountTotal += animationsCount

    addEventListener(element, eventName, (e) => {
      if (e.target !== element) {
        return
      }

      animationsPassedTotal++
      animationsPassed++

      if (!continuous && animationsCountTotal == animationsPassedTotal) {
        removeEventListener(element, eventName)
      }

      if (
        continuous ||
        (!continuous &&
          ((oncePerElems && animationsCountTotal == animationsPassedTotal) ||
            (!oncePerElems &&
              (!oncePerAnims ||
                (oncePerAnims && animationsCount == animationsPassed)))))
      ) {
        callback(element)
      }
    })
  })
}

/*
  ------------------------------------------------------------------------------
  Fires a callback function when CSS animation ends

  @param {String|Element|NodeList|Array} elements
      Selector, single or multiple elements to work with
  @param {Function} callback
      The function to call the animation ends
  @param {Object} options [optional] Optional comments
    @param {Bool} continuous (false)
        If `false` the event listener is removed once all of the desired
        callback functions are called. Otherwise it will keep listening
        for future animations
    @param {Bool} oncePerElems (true)
        If `true`, the callback function is called only once when all of the
        animations for all the given elements are completed. Otherwise the
        callback function is called per element basis, depending on the
        `oncePerAnims` option
    @param {Bool} oncePerAnims (true)
        If `true`, the callback function is called only once when all of the
        animations have been completed. Otherwise the function is called for
        each animation completed
*/

const onCssAnimationEnd = (...args) => {
  onEnd(`animation`, ...args)
}

/*
  ------------------------------------------------------------------------------
  Fires a callback function when CSS transition ends

  @param {String|Element|NodeList|Array} elements
      Selector, single or multiple elements to work with
  @param {Function} callback
      The function to call the animation ends
  @param {Object} options [optional] Optional comments
    @param {Bool} continuous (false)
        If `false` the event listener is removed once all of the desired
        callback functions are called. Otherwise it will keep listening
        for future transitions
    @param {Bool} oncePerElems (true)
        If `true`, the callback function is called only once when all of the
        transitions for all the given elements are completed. Otherwise the
        callback function is called per element basis, depending on the
        `oncePerAnims` option
    @param {Bool} oncePerAnims (true)
        If `true`, the callback function is called only once when all of the
        transitions have been completed. Otherwise the function is called for
        each transition completed
*/

const onCssTransitionEnd = (...args) => {
  onEnd(`transition`, ...args)
}

/*
  ------------------------------------------------------------------------------
  Cleans all CSS animation end event listeners

  @param {String|Element|NodeList|Array} elements Selector, single or multiple elements
*/

const clearCssAnimationEnd = (elements) => {
  removeEventListener(elements, animationEventName)
}

/*
  ------------------------------------------------------------------------------
  Cleans all CSS transition end event listeners

  @param {String|Element|NodeList|Array} elements Selector, single or multiple elements
*/

const clearCssTransitionEnd = (elements) => {
  removeEventListener(elements, transitionEventName)
}

// -----------------------------------------------------------------------------

export {
  onCssAnimationEnd,
  onCssTransitionEnd,
  clearCssAnimationEnd,
  clearCssTransitionEnd,
}
