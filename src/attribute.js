import { getElements } from './selector.js'

// local functions

const manipulateClass = (type, elements, classnames, force = undefined) => {
  elements = getElements(elements)

  elements.forEach((element) => {
    classnames = classnames.split(' ')
    classnames.forEach((classname) => {
      if(type == 'toggle') {
        element.classList.toggle(classname, force)
      }
      else {
        element.classList[type](classname)
      }
    })
  })
}

/*
  ------------------------------------------------------------------------------
  An extended implementation of Element.classList.add(): adds classname(s) to
  single or multiple elements

  @param {String|Element|NodeList|Array} elements Selector, single or multiple elements
  @param {String} classnames Space separated if multiple
*/

const addClass = (...args) => {
  manipulateClass('add', ...args)
}

/*
  ------------------------------------------------------------------------------
  An extended implementation of Element.classList.remove(): removes classname(s)
  from single or multiple elements

  @param {String|Element|NodeList|Array} elements Selector, single or multiple elements
  @param {String} classnames Space separated if multiple
*/

const removeClass = (...args) => {
  manipulateClass('remove', ...args)
}

/*
  ------------------------------------------------------------------------------
  An extended implementation of Element.classList.remove(): removes classname(s)
  from single or multiple elements

  @param {String|Element|NodeList|Array} elements Selector, single or multiple elements
  @param {String} classnames Space separated if multiple
  @param {Bool} [optional] force
*/

const toggleClass = (...args) => {
  manipulateClass('toggle', ...args)
}

/*
  ------------------------------------------------------------------------------
*/

export {
  addClass,
  removeClass,
  toggleClass,
}
