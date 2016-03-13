var JSHINT = require('jshint').JSHINT,
    minimatch = require('minimatch'),
    fs = require('fs'),
    async = require('async'),
    glob = require('glob');

function isIgnored(file, ignores) {
    return ignores.some(function(ignore) {
        return minimatch(file, ignore, { matchBase: true });
    });
}

var lineBreak = /\r\n|\n|\r/g;
function defaultReporter(err, file, src) {
    var lines = src.split(lineBreak);
    console.log([
        'JSHint error at "' + file + '":' + err.line,
        err.reason,
        err.line + ' | ' + lines[err.line - 1],
        ''
    ].join('\n'));
}

function hintFile(file, options, callback) {
    if (isIgnored(file, options.ignore)) {
        return callback();
    }

    fs.readFile(file, 'utf8', function(err, src) {
        if (err) { return callback(err); }

        if (!JSHINT(src, options.config, options.globals)) {
            JSHINT.errors.forEach(function(error) {
                options.reporter(error, file, src);
            });

            callback(null, true);
        } else {
            callback(null, false);
        }
    });
}

function buildJSHint(paths, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    options = options || {};
    options.ignore = options.ignore || [];
    options.config = options.config || {};
    options.globals = options.globals || {};
    options.reporter = options.reporter || defaultReporter;

    if (typeof paths === 'string') {
        paths = [paths];
    }

    var hasError = false;
    function processFile(file, callback) {
        hintFile(file, options, function(err, lintError) {
            if (err) { return callback(err); }

            hasError = hasError || lintError;
            callback();
        });
    }

    function processGlob(p, callback) {
        glob(p, function(err, files) {
            if (err) { return callback(err); }
            async.forEach(files, processFile, callback);
        });
    }

    async.forEach(paths, processGlob, function(err) {
        if (err) { return callback(err); }
        callback(null, hasError);
    });
}

module.exports = buildJSHint;
