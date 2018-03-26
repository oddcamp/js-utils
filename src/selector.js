/*
  Accepts String, Element, NodeList, Array and returns Array of elements

  @param {String|Array|Element|NodeList} elements
*/

const getElements = (elements) => {
  // Element
  if(typeof elements.length === 'undefined' || elements === window || elements === document) {
    elements = [elements]
  }
  // NodeList|Array|String
  else {
    // String
    if(typeof elements === 'string') {
      elements = document.querySelectorAll(elements)
    }

    elements = [...elements]
  }

  return elements
}

/*
  Based on how Element.closest() works. Returns true if `element` has the
  closest ancestor (or itself) that matches the `matches` (element|selector)

  @param {Element} element
  @param {String|Element} matches
*/

const hasClosest = (element, matches) => {
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
  Returns an Array of parents of `element` that matches the given `selector`
  up until the `until` matching element|selector

  @param {Element} element
  @param {String} selector [optional]
  @param {String|Element} until [optional]
*/

const getParents = (element, selector = '', until = null) => {
  let parents = []
  element = element.parentNode

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

export {
  getElements,
  hasClosest,
  getParents,
}
