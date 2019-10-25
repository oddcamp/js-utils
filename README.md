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
    import { addEventListener } from "js-utils/src/event"
    ```

3. Browse [Documentation](#documentation)

In order to gain a wider browser support, install and import these polyfills in your project:
  - [Element.closest / Element.matches](https://www.npmjs.com/package/element-closest)
  - [Nodelist.prototype.forEach](https://www.npmjs.com/package/nodelist-foreach-polyfill)
  - [Element.classList](https://www.npmjs.com/package/classlist-polyfill)
  - [CustomEvent](https://www.npmjs.com/package/custom-event-polyfill)

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

### [_cookie.js_](https://github.com/kollegorna/js-utils/blob/master/src/cookie.js)

#### `getCookieValue(name)`

Finds cookie by name and returns its value.

Examples:
```js
getCookieValue('_ga')
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

#### `delegateEventListener(selector, eventNames, callback)`

Delegates the event handler (an equivalent to jQuery's `.live()`).

Examples:
```js
delegateEventListener('.btn', 'click', doIt)
delegateEventListener('.btn', 'click focus', doIt)
```

In order to remove event handler, use `document` as a target element, e.g.:

```js
delegateEventListener('.btn', 'click', doIt) // delegate
removeEventListener(document, 'click', doIt) // remove
// removing without using the callback function:
delegateEventListener('.btn', 'click.btnDelegate', doIt) // delegate
removeEventListener(document, 'click.btnDelegate') // remove
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

### [_position.js_](https://github.com/kollegorna/js-utils/blob/master/src/position.js)

#### `getOffset(elements)`

Returns top/left offsets of an element

Returns: Object.

Example:
```js
getOffset(container)
getOffset('.container')
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

#### `getElements(elements [, source = document])`

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

### Utilities
* https://github.com/lodash/lodash _(utility library)_
* https://allyjs.io _(library simplifying certain accessibility features, functions and behaviors)_

### Accessibility
* https://github.com/davidtheclark/focus-trap _(trap focus within a DOM node)_
* https://github.com/edenspiekermann/a11y-toggle _(accessible content toggles)_

### Performance
* https://github.com/GoogleChromeLabs/quicklink _(faster subsequent page-loads by prefetching in-viewport links during idle time)_

### DOM manipulation
* https://github.com/Sjeiti/TinySort _(a small script that sorts HTML elements)_
* https://github.com/RubaXa/Sortable _(a library for reorderable drag-and-drop lists)_

### Modals
* https://github.com/edenspiekermann/a11y-dialog _(a very lightweight and flexible accessible modal dialog)_
* https://github.com/Ghosh/micromodal _(tiny javascript library for creating accessible modal dialogs)_

### Tooltips
* https://github.com/atomiks/tippyjs _(highly customizable vanilla JS tooltip/popover library)_
* https://github.com/FezVrasta/popper.js _(a kickass library to manage your poppers)_

### Validation
* https://github.com/chriso/validator.js _(string validators and sanitizers)_

### Forms and inputs
* https://scottaohara.github.io/a11y_styled_form_controls _(various styled accessible form controls)_
* https://github.com/jshjohnson/Choices _(vanilla JS customisable select box/text input plugin)_

### Gesture
* https://github.com/hammerjs/hammer.js _(multi-touch gestures)_

### Calendar
* https://github.com/dbushell/Pikaday _(lightweight, modular CSS datepicker)_
* https://github.com/flatpickr/flatpickr _(lightweight, powerful javascript datetimepicker with no dependencies)_

### Scroll
* https://basicscroll.electerious.com _(parallax scrolling with CSS variables)_
* https://github.com/dbrekalo/whenInViewport _(handle elements as they enter viewport)_
* https://github.com/KoryNunn/scroll-into-view _(scrolls an element into view if possible)_
* https://github.com/buzinas/simple-scrollbar _(custom scrollbar cross-browser)_

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
* https://www.npmjs.com/package/array.findindex _(lightweight Array.prototype.findIndex polyfill)_
* https://github.com/lazd/scopedQuerySelectorShim _(shims that enable the use of :scope)_
* https://github.com/github/fetch _(a window.fetch JavaScript polyfill)_
* https://www.npmjs.com/package/custom-event-polyfill _(a polyfill for CustomEvents on IE9+)_
* https://www.npmjs.com/package/new-event-polyfill _(new Event() polyfill)_
* https://github.com/jonathantneal/svg4everybody _(adds SVG External Content support to all browsers)_
* https://www.npmjs.com/package/element-dataset _(polyfills the HTMLElement.dataset property)_
* https://githubengineering.com/removing-jquery-from-github-frontend/#polyfills _(a nice list of polyfills)_
