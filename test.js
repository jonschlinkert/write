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
  });
});

