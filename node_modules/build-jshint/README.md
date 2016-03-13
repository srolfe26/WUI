# build-jshint

[![NPM](https://nodei.co/npm/build-jshint.png?compact=true)](https://nodei.co/npm/build-jshint/)

[![Build Status](https://drone.io/github.com/conradz/build-jshint/status.png)](https://drone.io/github.com/conradz/build-jshint/latest)
[![Dependency Status](https://gemnasium.com/conradz/build-jshint.png)](https://gemnasium.com/conradz/build-jshint)

Helper for running [JSHint](http://jshint.com) on JS files as part of a build
step from a Node.JS script.

## Example

```js
var buildJSHint = require('build-jshint');

// Errors will be logged to the console
buildJSHint('src/**/*.js', function(err, hasError) {
    // `err` is a fatal error, *not* a JSHint error
    // `hasError` indicates if any of the files had a JSHint error
});

// Example output:
// JSHint error at "src/my_file.js":32
// Missing semicolon.
// 32 | dont(care())

// With options
var opts = {
    // Array of globs of files to skip
    ignore: ['src/.file1'],

    // Handles output of errors
    // Default reporter logs errors to the console
    reporter: function(error, file, src) {
        // `error` is the JSHint error object
        // `file` is the path to the source file
        // `src` is the contents of the source file
    },

    // Configuration for JSHint
    config: { undef: true },

    // Global variables declared (passed to JSHint)
    globals: { document: false }
};

var files = ['src/file.js', 'src/scripts/*.js'];

buildJSHint(files, opts, function(err, hasError) {
    // ...
});
```

## Reference

### `buildJSHint(paths, [opts], callback)`

Runs JSHint on the path specified.

`paths` is a string or array of strings specifying the globs that will be used
to find the files to process. You can specify wildcard and other glob patterns
to search.

`opts` is an optional object specifying the configuration properties. See the
above example for the complete list.

`callback` is a function that will be called when the processing is done. If
a fatal error occurred (such as error reading a file; JSHint errors are *not*
included), it will be passed to the callback as the first argument. The second
arguments will be a boolean indicated whether a JSHint error was encountered in
any of the files.