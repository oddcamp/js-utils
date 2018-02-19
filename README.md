# Kollegorna's JavaScript utilities

A library of ES6 utilities.

- [Usage](#usage)
- [Development](#development)
- [Documentation](#documentation)

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

### events.js

#### `addEventListener(elements, eventName, handler [, options/useCapture = false])`

Attaches an event handler function to the selected element(s).
* `elements` — a selector string, single or multiple elements
* `eventName` — single or multiple space-separated event names and optional namespaces
* `handler` — a function to execute when the event is triggered
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

Removes an event handler:
* `elements` — a selector string, single or multiple elements
* `eventName` — event name and optional namespace
* `handler` — a function to execute when the event is triggered
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
