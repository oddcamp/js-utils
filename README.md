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

## Development

1. Install dependencies with `$ yarn`
2. Run `$ gulp` when developing. This will run the linter for your own good
3. Edit contents of `src`
4. Make sure the corresponding examples on `demo` are updated/added. Do `$ node server.js` to start the server for browsing/testing the demos

## Documentation

### _events.js_

#### `addEventListener(elements, eventName, callback [, options/useCapture = false])`

Attaches an event handler function to the selected element(s).
* `elements` — a selector string, single or multiple elements
* `eventName` — single or multiple space-separated event names and optional namespaces
* `callback` — a function to execute when the event is triggered
* `options/useCapture` — more [info here](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

Examples:
```js
addEventListener(btns, 'click', doIt)
addEventListener([btn1, btn2], 'click', doIt)
addEventListener('.btn', 'click', doIt)
addEventListener(btn, 'click focus', doIt)
addEventListener(btn, 'click', doIt, { passive: false })
```

#### `removeEventListener(elements [, eventName = false, callback = false, options/useCapture = false])`

Removes an event handler.
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

### _smart-outline.js_

Smart Outline hides the outline when interacting with mouse and brings it back when interacting with keyboard.

#### `initSmartOutline([selectors])`

Inits Smart Outline.
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
* `delay` — delay in miliseconds
* `func` — function

Example:
```js
window.addEventListener('resize', debounce(500, () => {
  // do something expensive here
}));
```

### _throttle.js_

#### `throttle(delay, func)`

Throttle execution of a function.
* `delay` — delay in miliseconds
* `func` — function

Example:
```js
window.addEventListener('scroll', throttle(500, () => {
  // do something expensive here
}));
```

## Other resources

For more functionality, consider using these vanilla JavaScript libraries:

### Misc
* https://github.com/lodash/lodash _(utility library)_

### Scroll
* https://basicscroll.electerious.com _(parallax scrolling with CSS variables)_

### Charts
* https://frappe.github.io/charts _(simple, responsive, modern charts library)_

### Browsing experience
* https://github.com/turbolinks/turbolinks _(browse the site without "hard refresh")_
* https://github.com/luruke/barba.js _(fluid and smooth transition between website's pages)_

### CSS
* https://polished.js.org _(a lightweight toolset for writing CSS in JS)_
