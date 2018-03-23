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
    import throttle from "js-utils/src/throttle"
    ```

3. Browse [Documentation](#documentation)

In order to gain a wider browser support, install and import these polyfills:
  - [nodelist-foreach-polyfill](https://www.npmjs.com/package/nodelist-foreach-polyfill)

## Development

1. Install dependencies with `$ yarn`
2. Run `$ yarn dev` when developing. This will:
    - Run the linter for your own good
    - Start server for demos
3. Edit contents of `src` and make sure the corresponding examples on `demo` are updated/added

## Documentation

### _event.js_

#### `addEventListener(elements, eventNames, callback [, options/useCapture = false])`

Attaches an event handler function to the selected element(s).

Accepts:
* `elements` — a selector string, single or multiple elements
* `eventNames` — single or multiple space-separated event names and optional namespaces
* `callback` — a function to execute when the event is triggered
* `options/useCapture` — more [info here](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

Examples:
```js
addEventListener(btns, 'click', doIt)
addEventListener([btn1, btn2], 'click', doIt)
addEventListener('.btn', 'click', doIt)
addEventListener(btn, 'click focus', doIt)
addEventListener(btn, 'click', doIt, { passive: true })
```

#### `removeEventListener(elements [, eventName = false, callback = false, options/useCapture = false])`

Removes an event handler.

Accepts:
* `elements` — a selector string, single or multiple elements
* `eventName` — event name and optional namespace
* `callback` — a function to execute when the event is triggered
* `options/useCapture` — more [info here](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

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

#### `triggerEvent(elements, eventNames[, data = null])`

Triggers an event.

Accepts:
* `elements` — a selector string, single or multiple elements
* `eventNames` — single or multiple space-separated event names and optional namespaces
* `data` — data to pass to the event handler (`(e) => {e.detail}`). Doesn't work with `click|focus|blur` events.

Examples:
```js
triggerEvent(btn, 'click') // triggers 'click' event
triggerEvent(btn, 'click.thisIsNamespace') // triggers 'click.thisIsNamespace' event
triggerEvent(btn, '.thisIsNamespace') // triggers all events with 'thisIsNamespace' namespace
triggerEvent(btn, 'customEvent') // triggers custom event
triggerEvent(btn, 'customEvent', 'someData') // triggers custom event and passed data
triggerEvent(btn, 'customEvent', {some: 'data'}) // triggers custom event and passed data
```

### _smart-outline.js_

Smart Outline hides the outline when interacting with mouse and brings it back when interacting with keyboard.

#### `initSmartOutline([selectors])`

Inits Smart Outline.

Accepts:
* `selectors` — an array of CSS selectors whose elements to affect. Default value:

    ```js
    [
      'input:focus',
      'button:focus',
      'textarea:focus',
      'select:focus',
    ]
    ```

#### `haltSmartOutline()`

Halts Smart Outline.

### _debounce.js_

#### `debounce(delay, func)`

Debounce execution of a function.

Accepts:
* `delay` — delay in miliseconds
* `func` — function

Example:
```js
window.addEventListener('resize', debounce(500, () => {
  // do something expensive here
}))
```

### _throttle.js_

#### `throttle(delay, func)`

Throttle execution of a function.

Accepts:
* `delay` — delay in miliseconds
* `func` — function

Example:
```js
window.addEventListener('scroll', throttle(500, () => {
  // do something expensive here
}))
```

### _load-script.js_

#### `loadScript(src, cache = true)`

Loads script file.

Accepts:
* `src` — file to load
* `cache` — load naturally (default) or add a URL parameter to bust the cache

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

### _promise.js_

#### `serialPromises(...funcs)`

Resolves promises sequentially.

Accepts:
* `...funcs` — functions as arguments

Returns: Promise.

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

## Other resources

For more functionality, consider using these vanilla JavaScript libraries:

### Misc
* https://github.com/lodash/lodash _(utility library)_

### DOM manipulation
* https://github.com/Sjeiti/TinySort _(a small script that sorts HTML elements)_

### Validation
* https://github.com/chriso/validator.js _(string validators and sanitizers)_

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

* https://github.com/jonathantneal/svg4everybody _(adds SVG External Content support to all browsers)_
* https://www.npmjs.com/package/element-closest _(polyfill for #Element.closest)_
* https://www.npmjs.com/package/nodelist-foreach-polyfill _(polyfill for Nodelist.prototype.forEach())_
