/*!
 * write <https://github.com/jonschlinkert/write>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var exists = require('fs-exists-sync');
var fs = require('fs');
var del = require('delete');
var should = require('should');
var async = require('async');
var writeFile = require('./');

var files = ['tmp/a.md', 'tmp/b.md', 'tmp/c.md', 'tmp/d.md', 'tmp/e.md'];

describe('write :', function() {
  afterEach(function(cb) {
    async.each(files, function(fp, next) {
      fs.stat(fp, next);
    }, function(err) {
      if (err) return cb(err);
      del('tmp', cb);
    });
  });

  it('should write files asynchronously', function(cb) {
    async.each(files, function(fp, next) {
      writeFile(fp, 'content...', next);
    }, cb);
  });
});

describe('write sync:', function() {
  afterEach(function() {
    files.forEach(function(fp) {
      assert(exists(fp));
    });

    del.sync('tmp');
  });

  it('should write files synchronously', function() {
    files.forEach(function(fp) {
      writeFile.sync(fp, '');
    });
  });
});

describe('write stream:', function() {
  afterEach(function(cb) {
    fs.stat('tmp/a/b/c/foo.md', function(err, stats) {
      if (err) return cb(err);
      del('tmp', cb);
    });
  });

  it('should write files', function() {
    var file = fs.createReadStream('README.md')
      .pipe(writeFile.stream('tmp/a/b/c/foo.md'))
  });
});
