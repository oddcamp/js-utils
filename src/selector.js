/*
  ------------------------------------------------------------------------------
  Accepts String, Element, NodeList, Array and returns Array of elements

  @param {String|Array|Element|NodeList} elements
  @returns {Array}
*/

const getElements = (elements, source = document) => {
  // Element
  if(typeof elements === 'object' || elements === window || elements === document) {
    elements = [elements]
  }
  // NodeList|Array|String
  else {
    // String
    if(typeof elements === 'string') {
      elements = source.querySelectorAll(elements)
    }

    elements = [...elements]
  }

  return elements
}

/*
  ------------------------------------------------------------------------------
  Based on how Element.closest() works. Returns true if `element` has the
  closest ancestor (or is itself) that matches the `matches` (element|selector)

  @param {String|Element} element
  @param {String|Element} matches
  @returns {Bool}
*/

const hasClosest = (element, matches) => {
  element = getElements(element)[0]

  if(typeof matches === 'string') {
    return element.closest(matches) ? true : false
  }
  else {
    while(element) {
      if(element === matches) {
        return true
      }
      element = element.parentNode
    }
    return false
  }
}

/*
  ------------------------------------------------------------------------------
  Returns an Array of parents of `element` that matches the given `selector`
  up until the `until` matching element|selector

  @param {String|Element} element
  @param {String} selector [optional]
  @param {String|Element} until [optional]
  @returns {Array}
*/

const getParents = (element, selector = '', until = null) => {
  element = getElements(element)[0]
  element = element.parentNode
  let parents = []

  while(element) {
    if(element === document) {
      break
    }

    if(!selector || element.matches(selector)) {
      parents.push(element)
    }

    if(until) {
      if(typeof until === 'string') {
        if(element.matches(until)) {
          break
        }
      }
      else if(element === until) {
        break
      }
    }

    element = element.parentNode
  }
  return parents
}

/*
  ------------------------------------------------------------------------------
*/

export {
  getElements,
  hasClosest,
  getParents,
}
