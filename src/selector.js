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

export {
  getElements,
}
