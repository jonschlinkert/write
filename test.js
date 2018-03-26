/*!
 * write <https://github.com/jonschlinkert/write>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var fs = require('fs');
var assert = require('assert');
var Readable = require('stream').Readable;
var del = require('delete');
var each = require('async-each');
var writeFile = require('./');
var files = ['tmp/a.md', 'tmp/b.md', 'tmp/c.md', 'tmp/d.md', 'tmp/e.md'];

function toStream(str) {
  var stream = new Readable();
  stream.push(str);
  stream.push(null);
  return stream;
}

describe('write', function() {
  afterEach(function(cb) {
    each(files, function(fp, next) {
      fs.stat(fp, next);
    }, function(err) {
      if (err) return cb(err);
      del('tmp', cb);
    });
  });

  describe('End New Line', function () {
    it('should just write given data by default', function (done) {
      each(files, function (fp, next) {
        writeFile(fp, 'Hello!', function () {
          fs.readFile(fp, function (err, fileContent) {
            if (err) {
              return next(err);
            }

            assert.equal('Hello!', fileContent.toString());
            next();
          });
        });
      }, done);
    });

    describe('With `ensureNewLine` option to true', function () {
      it('should add a new line at the end of the file if none', function (done) {
        each(files, function (fp, next) {
          writeFile(fp, 'Hello!', { ensureNewLine: true }, function () {
            fs.readFile(fp, function (err, fileContent) {
              if (err) {
                return next(err);
              }

              assert.equal('Hello!\n', fileContent.toString());
              next();
            });
          });
        }, done);
      });

      it('should not add a new line at the end of the file if there is already one', function (done) {
        each(files, function (fp, next) {
          writeFile(fp, "Hello!\n", { ensureNewLine: true }, function() {
            fs.readFile(fp, function (err, fileContent) {
              if (err) {
                return next(err);
              }

              assert.equal('Hello!\n', fileContent.toString());
              next();
            });
          });
        }, done);
      });
    });
  });

  describe('async', function() {
    it('should write files', function(cb) {
      each(files, function(fp, next) {
        writeFile(fp, 'content...', next);
      }, cb);
    });

    it('should return a promise when no callback is given', function(cb) {
      each(files, function(fp, next) {
        writeFile(fp, 'content...')
          .then(function() {
            next();
          })
          .catch(function(err) {
            next(err);
          });
      }, cb);
    });
  });

  describe('promise', function() {
    it('should write files using .promise', function(cb) {
      each(files, function(fp, next) {
        writeFile.promise(fp, 'content...')
          .then(function() {
            next();
          })
          .catch(function(err) {
            next(err);
          });
      }, cb);
    });
  });

  describe('sync', function() {
    it('should write files using .sync', function() {
      files.forEach(function(fp) {
        writeFile.sync(fp, '');
      });
    });
  });

  describe('stream', function() {
    it('should write files using .stream', function(cb) {
      each(files, function(fp, next) {
        toStream('this is content...')
          .pipe(writeFile.stream(fp))
          .on('close', next)
      }, cb);
    });

    it('should overwrite an existing file', function(cb) {
      var fixtures = files.slice().concat(['tmp/e.md', 'tmp/e.md']);

      each(files, function(fp, next) {
        toStream('this is content...')
          .pipe(writeFile.stream(fp))
          .on('close', next)
      }, cb);
    });
  });
});

