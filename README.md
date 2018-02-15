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

3. Browse [src](https://github.com/kollegorna/js-utils/tree/master/src) for utilities and [demo](https://github.com/kollegorna/js-utils/tree/master/demo) for their usage examples

## Development

1. Install dependencies with `$ yarn`
2. Run `$ gulp` when developing. This will run the linter for your own good
3. Edit contents of `src`
4. Make sure the corresponding examples on `demo` are updated/added. Do `$ node server.js` to start the server for browsing/testing the demos
