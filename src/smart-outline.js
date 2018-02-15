/*
  Disables outline on mouse and re-enables on keyboard activity

  Example:

    smartOutline([
      'CSS selector',
      ...
    ]);
*/

const smartOutline = (elements) => {

  elements = elements || [
    'input:focus',
    'button:focus',
    'textarea:focus',
    'select:focus',
  ]

  const applyStyles = () => {
    const oldStyle = document.querySelector('style[data-smart-outline]')
    oldStyle.parentNode.removeChild(oldStyle)

    const css = `
      ${elements.join(', ')} {
        outline: none !important;
      }
    `

    const newStyle = document.createElement('style')
    newStyle.setAttribute('data-smart-outline', '')
    newStyle.appendChild(document.createTextNode(css))
    document.head.appendChild(newStyle)
  }

  applyStyles()
  // document.documentElement.classList.add(className)

  document.addEventListener("mousedown", function() {
    applyStyles()
    // document.documentElement.classList.add(className)
  });

  document.addEventListener("keyup", function(e) {
    if(e.which == 9) {
      applyStyles()
      // document.documentElement.classList.remove(className)
    }
  });

}

export default smartOutline
