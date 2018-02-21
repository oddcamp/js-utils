/*
  Disables outline on mouse and re-enables on keyboard activity
*/

import { addEventListener, removeEventListener } from './events.js'

const initSmartOutline = (selectors) => {
  selectors = selectors || [
    'input:focus',
    'button:focus',
    'textarea:focus',
    'select:focus',
  ]

  haltSmartOutline()
  insertStyles(selectors)

  addEventListener(document, 'mousedown.smartOutline', function() {
    if(!getOldStylesEl()) {
      insertStyles(selectors)
    }
  })

  addEventListener(document, 'keyup.smartOutline', function(e) {
    if(e.which == 9) { // tab
      removeOldStyles()
    }
  })
}

/*
  Halts Smart Outline
*/

const haltSmartOutline = () => {
  removeOldStyles()
  removeEventListener(document, 'mousedown.smartOutline')
  removeEventListener(document, 'keyup.smartOutline')
}

// Helpers

const insertStyles = (selectors) => {
  const css = `
    ${selectors.join(', ')} {
      outline: none !important;
    }
  `

  const newStyle = document.createElement('style')
  newStyle.setAttribute('data-smart-outline', '')
  newStyle.appendChild(document.createTextNode(css))
  document.head.appendChild(newStyle)
}

const removeOldStyles = () => {
  const oldStyle = getOldStylesEl()
  if(oldStyle) {
    oldStyle.parentNode.removeChild(oldStyle)
  }
}

const getOldStylesEl = () => {
  return document.head.querySelector('style[data-smart-outline]')
}

export {
  initSmartOutline as default,
  haltSmartOutline,
}
