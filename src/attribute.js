import { getElements } from "./selector.js"

// local functions

const manipulateClass = (type, elements, classnames, force = undefined) => {
  elements = getElements(elements)
  classnames = classnames.split(` `)

  elements.forEach((element) => {
    classnames.forEach((classname) => {
      if (type == `toggle`) {
        element.classList.toggle(classname, force)
      } else {
        element.classList[type](classname)
      }
    })
  })
}

const getElement = (element) => {
  return typeof element === `string` ? document.querySelector(element) : element
}

/*
  ------------------------------------------------------------------------------
  An extended implementation of Element.classList.add(): adds classname(s) to
  single or multiple elements

  @param {String|Element|NodeList|Array} elements Selector, single or multiple elements
  @param {String} classnames Space separated if multiple
*/

const addClass = (...args) => {
  manipulateClass(`add`, ...args)
}

/*
  ------------------------------------------------------------------------------
  An extended implementation of Element.classList.remove(): removes classname(s)
  from single or multiple elements

  @param {String|Element|NodeList|Array} elements Selector, single or multiple elements
  @param {String} classnames Space separated if multiple
*/

const removeClass = (...args) => {
  manipulateClass(`remove`, ...args)
}

/*
  ------------------------------------------------------------------------------
  An extended implementation of Element.classList.remove(): toggles classname(s)
  from single or multiple elements

  @param {String|Element|NodeList|Array} elements Selector, single or multiple elements
  @param {String} classnames Space separated if multiple
  @param {Bool} [optional] force
*/

const toggleClass = (...args) => {
  manipulateClass(`toggle`, ...args)
}

/*
  ------------------------------------------------------------------------------
  Check if an element contains at least one classname

  @param {String|Element} elements Selector, single element
  @param {String} classnames Space separated if multiple
*/

const containsAnyClass = (element, classnames) => {
  element = getElement(element)
  if (!element) return null

  let contains = false
  classnames.split(` `).some((classname) => {
    contains = element.classList.contains(classname)
    return contains
  })

  return contains
}

/*
  ------------------------------------------------------------------------------
  Check if an element contains all classnames

  @param {String|Element} elements Selector, single element
  @param {String} classnames Space separated if multiple
*/

const containsAllClasses = (element, classnames) => {
  element = getElement(element)
  if (!element) return null

  let contains = false
  classnames.split(` `).every((classname) => {
    contains = element.classList.contains(classname)
    return contains
  })

  return contains
}

/*
  ------------------------------------------------------------------------------
*/

export {
  addClass,
  removeClass,
  toggleClass,
  containsAnyClass,
  containsAllClasses,
}
