import { getElements } from "./selector.js"

/*
  ------------------------------------------------------------------------------
  Returns top/left offsets of an element

  @param {String|Element|NodeList|Array} elements Selector, single or multiple elements
  @returns {Object}
*/

const getOffset = (elements) => {
  const element = getElements(elements)

  if (!element.length) {
    return null
  }

  const rect = element[0].getBoundingClientRect()

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  }
}

/*
  ------------------------------------------------------------------------------
*/

export { getOffset }
