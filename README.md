# Kollegorna's JavaScript utilities

A library of ES6 utilities.

- [Usage](#usage)
- [Development](#development)
- [Documentation](#documentation)
- [Other resources](#other-resources)

## Usage

1. Install with `$ yarn add kollegorna/js-utils#commit`. Using commit ID is highly recommended. Pick the [latest commit](https://github.com/kollegorna/js-utils/commits/master) for a new project
2. Import utils you need to your project, e.g.:

    ```js
    import addEventListener from "js-utils/src/event"
    ```

3. Browse [Documentation](#documentation)

In order to gain a wider browser support, install and import these polyfills in your project:
  - [element-closest](https://www.npmjs.com/package/element-closest) _(polyfills for Element.closest and Element.matches)_
  - [nodelist-foreach-polyfill](https://www.npmjs.com/package/nodelist-foreach-polyfill) _(polyfill for Nodelist.prototype.forEach())_
  - [classlist-polyfill](https://www.npmjs.com/package/classlist-polyfill) _(polyfill for Element.classList)_

## Development

1. Install dependencies with `$ yarn`
2. Run `$ yarn dev` when developing. This will:
    - Run the linter for your own good
    - Start server for demos
3. Edit contents of `src` and make sure the corresponding examples on `demo` are updated/added

## Documentation

### [_animation.js_](https://github.com/kollegorna/js-utils/blob/master/src/animation.js)

#### `onCssAnimationEnd(elements, callback [, options = { continuous = false, oncePerElems = true, oncePerAnims = true }])`

Fires a callback function when CSS animation ends.

Examples:
```js
onCssAnimationEnd(btn, callbackFunction)
onCssAnimationEnd(btns, callbackFunction, {oncePerAnims = false})
onCssAnimationEnd('.btn', callbackFunction)
```

#### `onCssTransitionEnd(elements, callback [, options = { continuous = false, oncePerElems = true, oncePerAnims = true }])`

Fires a callback function when CSS transition ends

Examples:
```js
onCssTransitionEnd(btn, callbackFunction)
onCssTransitionEnd(btns, callbackFunction, {oncePerElems = false})
onCssTransitionEnd('.btn', callbackFunction)
```

#### `clearCssAnimationEnd(elements)`

Cleans all CSS animation end event listeners

#### `clearCssTransitionEnd(elements)`

Cleans all CSS transition end event listeners

### [_attribute.js_](https://github.com/kollegorna/js-utils/blob/master/src/attribute.js)

#### `addClass(elements, classnames)`

An extended implementation of Element.classList.add(): adds classname(s) to
single or multiple elements

Examples:
```js
addClass(btn, 'btn--green')
addClass('.btn', 'btn--disabled btn--grey')
```

#### `removeClass(elements, classnames)`

An extended implementation of Element.classList.remove(): removes classname(s)
from single or multiple elements

Examples:
```js
removeClass(btn, 'btn--green')
removeClass('.btn', 'btn--disabled btn--grey')
```

#### `toggleClass(elements, classnames [, force = undefined])`

An extended implementation of Element.classList.remove(): toggles classname(s)
from single or multiple elements

Examples:
```js
toggleClass(btn, 'btn--green', true)
toggleClass('.btn', 'btn--disabled btn--grey')
```

### [_event.js_](https://github.com/kollegorna/js-utils/blob/master/src/event.js)

#### `addEventListener(elements, eventNames, callback [, options/useCapture = false])`

Attaches the event handler. More about [options/useCapture](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

Examples:
```js
addEventListener(btns, 'click', doIt)
addEventListener([btn1, btn2], 'click', doIt)
addEventListener('.btn', 'click', doIt)
addEventListener(btn, 'click focus', doIt)
addEventListener(btn, 'click', doIt, { passive: true })
```

#### `removeEventListener(elements [, eventName = false, callback = false, options/useCapture = false])`

Removes the event handler. More about [options/useCapture](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

Examples:
```js
removeEventListener(btn) // removes all event hanlders
removeEventListener(btn, 'click') // removes 'click' event handlers
removeEventListener('.btn', 'click') // removes 'click' event handlers
removeEventListener(btn, 'click.thisIsNamespace') // removes 'click.thisIsNamespace' event hanlders handlers
removeEventListener(btn, false, doIt) // removes all event handlers that are equal to 'doIt()'
removeEventListener(btn, 'click', doIt) // removes 'click' event handlers that are equal to 'doIt()'
removeEventListener(btn, false, false, { passive: false }) // removes all event handlers that were attached together with the exact provided options
```

#### `triggerEvent(elements, eventNames [, data = null])`

Triggers the event(s). `data` — data to pass to the event handler (`(e) => {e.detail}`). Doesn't work with `click|focus|blur` events.

Examples:
```js
triggerEvent(btn, 'click') // triggers 'click' event
triggerEvent(btn, 'click.thisIsNamespace') // triggers 'click.thisIsNamespace' event
triggerEvent(btn, '.thisIsNamespace') // triggers all events with 'thisIsNamespace' namespace
triggerEvent(btn, 'customEvent') // triggers custom event
triggerEvent(btn, 'customEvent anotherCustomEvent') // triggers custom event
triggerEvent(btn, 'customEvent', 'someData') // triggers custom event and passed data
triggerEvent(btn, 'customEvent', {some: 'data'}) // triggers custom event and passed data
```

### [_function.js_](https://github.com/kollegorna/js-utils/blob/master/src/function.js)

#### `debounce(delay, fn)`

Debounces execution of a function.

Example:
```js
window.addEventListener('resize', debounce(500, () => {
  // do something expensive here
}))
```

#### `throttle(delay, fn)`

Throttles execution of a function.

Example:
```js
window.addEventListener('scroll', throttle(500, () => {
  // do something expensive here
}))
```

### [_load-script.js_](https://github.com/kollegorna/js-utils/blob/master/src/load-script.js)

#### `loadScript(src, cache = true)`

Loads script file.

Returns: Promise.

Example:
```js
loadScript('jquery.min.js', false)
  .then(() => {
    alert(typeof $)
  }).catch(error => {
    alert(`Error: ${error}. Try again.`)
  })
```

### [_promise.js_](https://github.com/kollegorna/js-utils/blob/master/src/promise.js)

#### `serialPromises(...fns)`

Resolves promises sequentially.

Example:
```js
serialPromises(
  () => loadScript('jquery.min.js'),
  () => loadScript('jquery-ui.min.js'),
).then(() => {
  $('ul').sortable()
}).catch(error => {
  // error
})
```

### [_selector.js_](https://github.com/kollegorna/js-utils/blob/master/src/selector.js)

#### `getElements(elements)`

Accepts String, Element, NodeList, Array and returns Array of elements.

#### `hasClosest(element, matches)`

Based on how Element.closest() works. Returns true if `element` has the
closest ancestor (or itself) that matches the `matches` (element|selector).

#### `getParents(element [, selector = '', until = null])`

Returns an Array of parents of `element` that matches the given `selector`
up until the `until` matching element|selector.

### [_smart-outline.js_](https://github.com/kollegorna/js-utils/blob/master/src/smart-outline.js)

Smart Outline hides the outline when interacting with a mouse and brings it back when interacting with a keyboard.

#### `initSmartOutline([selectors])`

Inits Smart Outline. `selectors` is an array of CSS selectors whose elements to affect. Default value:

    ```js
    [
      'input:focus',
      'button:focus',
      'textarea:focus',
      'select:focus',
    ]
    ```

#### `showSmartOutline()`

Temporarily reveals outline.

#### `haltSmartOutline()`

Halts Smart Outline.

## Other resources

For more functionality, consider using these vanilla JavaScript libraries:

### Misc
* https://github.com/lodash/lodash _(utility library)_

### DOM manipulation
* https://github.com/Sjeiti/TinySort _(a small script that sorts HTML elements)_

### Validation
* https://github.com/chriso/validator.js _(string validators and sanitizers)_

### Forms
* https://github.com/jshjohnson/Choices _(vanilla JS customisable select box/text input plugin)_

### Gesture
* https://github.com/hammerjs/hammer.js _(multi-touch gestures)_

### Calendar
* https://github.com/dbushell/Pikaday _(lightweight, modular CSS datepicker)_

### Scroll
* https://basicscroll.electerious.com _(parallax scrolling with CSS variables)_
* https://github.com/dbrekalo/whenInViewport _(handle elements as they enter viewport)_
* https://github.com/zengabor/zenscroll _(smooth-scroll web pages and other scrollable elements)_

### Charts
* https://frappe.github.io/charts _(simple, responsive, modern charts library)_

### Browsing experience
* https://github.com/turbolinks/turbolinks _(browse the site without "hard refresh")_
* https://github.com/luruke/barba.js _(fluid and smooth transition between website's pages)_

### Menus
* https://github.com/osvaldasvalutis/accessiblenav.js _(accessible multi-level dropdown menus)_

### CSS
* https://polished.js.org _(a lightweight toolset for writing CSS in JS)_

### Video
* https://www.npmjs.com/package/fitvids _(responsive videos)_

### Polyfils

* https://www.npmjs.com/package/element-closest _(polyfills for Element.closest and Element.matches)_
* https://www.npmjs.com/package/nodelist-foreach-polyfill _(polyfill for Nodelist.prototype.forEach_
* https://www.npmjs.com/package/classlist-polyfill _(polyfill for Element.classList)_
* https://github.com/jonathantneal/svg4everybody _(adds SVG External Content support to all browsers)_
