// Lints the source files

var buildJSHint = require('./index');

var opts = {
    config: {
        node: true,
        undef: true,
        unused: true,
        trailing: true,
        expr: true
    },
    globals: { it: false, describe: false }
};

var files = [
    '*.js',
    'test/*.js'
];

buildJSHint(files, opts, function(err) {
    if (err) { throw err; }
});
