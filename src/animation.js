import { addEventListener, removeEventListener } from '/src/event.js'

const animationEventNames = {
  'animation': 'animationend',
  'OAnimation': 'oAnimationEnd',
  'MozAnimation': 'animationend',
  'WebkitAnimation': 'webkitAnimationEnd',
}
const transitionEventNames = {
  'transition': 'transitionend',
  'OTransition': 'oTransitionEnd',
  'MozTransition': 'transitionend',
  'WebkitTransition': 'webkitTransitionEnd',
}

let animationEventName = ''
let transitionEventName = ''

const el = document.createElement('fakeelement')
for(let e in animationEventNames) {
  if(el.style[e] !== undefined) {
    animationEventName = `${animationEventNames[e]}.onCssAnimationEnd`
    break
  }
}
for(let e in transitionEventNames) {
  if(el.style[e] !== undefined) {
    transitionEventName = `${transitionEventNames[e]}.onCssTransitionEnd`
    break
  }
}

const getElements = (elements) => {
  if(typeof elements === 'string') {
    elements = document.querySelectorAll(elements)
  }
  else if(typeof elements.length === 'undefined' || elements.length === 0) {
    elements = [elements]
  }
  return elements
}

const onEnd = (
  type,
  elements,
  callback,
  {
    continuous = false,
    oncePerElems = true,
    oncePerAnims = true,
  } = {}
) => {

  if(!oncePerAnims) {
    oncePerElems = false
  }

  elements = getElements(elements)
  const eventName = type == 'animation' ? animationEventName : transitionEventName
  let animationsCountTotal = 0
  let animationsPassedTotal = 0

  elements.forEach((element) => {
    const animationsCount = (
      window
        .getComputedStyle(element)[type == 'animation' ? 'animation-name' : 'transition-property']
          .match(/,/g) || []
    ).length + 1

    let animationsPassed = 0
    animationsCountTotal += animationsCount

    addEventListener(element, eventName, (e) => {
      if(e.target !== element) {
        return
      }

      animationsPassedTotal++
      animationsPassed++

      if(!continuous && animationsCountTotal == animationsPassedTotal) {
        removeEventListener(element, eventName)
      }

      if(
        continuous ||
        !continuous && (
          oncePerElems && animationsCountTotal == animationsPassedTotal ||
          !oncePerElems && (!oncePerAnims || oncePerAnims && animationsCount == animationsPassed)
        )
      ){
        callback(element)
      }
    })
  })

}

// -----------------------------------------------------------------------------
// Fires a callback function when CSS animation ends

const onCssAnimationEnd = (...args) => {
  onEnd('animation', ...args)
}

// -----------------------------------------------------------------------------
// Fires a callback function when CSS transition ends

const onCssTransitionEnd = (...args) => {
  onEnd('transition', ...args)
}

// -----------------------------------------------------------------------------
// Cleans all CSS animation end event listeners

const clearCssAnimationEnd = (elements) => {
  removeEventListener(elements, animationEventName)
}

// -----------------------------------------------------------------------------
// Cleans all CSS transition end event listeners

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
