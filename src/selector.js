/*
  Accepts string, Element, NodeList and returns Array of elements
*/

const getElements = (elements) => {
  // Element
  if(typeof elements.length === 'undefined' || elements === window || elements === document) {
    elements = [elements]
  }
  // NodeList|string
  else {
    // string
    if(typeof elements === 'string') {
      elements = document.querySelectorAll(elements)
    }

    elements = [...elements]
  }

  return elements
}

/*
  Based on how Element.closest() works. Returns true if `element` has the
  closest ancestor (or itself) that matches the element|selector
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

export {
  getElements,
  hasClosest,
}
