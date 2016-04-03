var buildJSHint = require('../index'),
    expect = require('chai').expect,
    path = require('path');

describe('buildJSHint', function() {

    it('should report JSHint errors in a file', function(done) {
        var file = path.join(__dirname, 'files/error_semicolon.js');
        var errors = [];
        var opts = {
            reporter: function(err) {
                errors.push(err);
            }
        };

        buildJSHint(file, opts, function(err, hasError) {
            expect(err).to.not.exist;
            expect(hasError).to.be.true;
            expect(errors).to.have.length(1);
            done();
        });
    });

    it('should ignore files that match ignore', function(done) {
        var filesDir = path.join(__dirname, 'files/*.js');
        var errors = [];
        var opts = {
            reporter: function(err) { errors.push(err); },
            ignore: ['error_*.js']
        };

        buildJSHint(filesDir, opts, function(err, hasError) {
            expect(err).to.not.exist;
            expect(hasError).to.be.false;
            expect(errors).to.be.empty;
            done();
        });
    });

    it('should pass config options to JSHint', function(done) {
        var errors = [];
        var opts = {
            reporter: function(err) { errors.push(err); },
            config: { undef: true }
        };

        var file = path.join(__dirname, 'files/error_global.js');
        buildJSHint(file, opts, function(err, hasError) {
            expect(err).to.not.exist;
            expect(hasError).to.be.true;
            expect(errors).to.have.length(1);
            done();
        });
    });

    it('should pass globals to JSHint', function(done) {
        var errors = [];
        var opts = {
            reporter: function(err) { errors.push(err); },
            config: { undef: true },
            globals: { testGlobal: false }
        };

        var file = path.join(__dirname, 'files/error_global.js');
        buildJSHint(file, opts, function(err, hasError) {
            expect(err).to.not.exist;
            expect(hasError).to.be.false;
            expect(errors).to.be.empty;
            done();
        });
    });

    it('should report errors to console by default', function(done) {
        var original = console.log;
        var lines = [];
        console.log = function(text) {
            if (typeof text === 'string') {
                lines = lines.concat(text.split(/\n/g));
            } else {
                original.apply(console, arguments);
            }
        };

        var file = path.join(__dirname, 'files/error_semicolon.js');
        buildJSHint(file, function(err) {
            console.log = original;

            expect(err).to.not.exist;

            // Glob reports filenames with `/` even on windows
            file = file.replace(/\\/g, '/');

            expect(lines).to.eql([
                'JSHint error at "' + file + '":2',
                'Missing semicolon.',
                '2 | Object.create({})',
                ''
            ]);
            done();
        });
    });

});
