/*!
 * write <https://github.com/jonschlinkert/write>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var fs = require('fs');
var del = require('delete');
var should = require('should');
var async = require('async');
var writeFile = require('./');

var files = ['tmp/a.md', 'tmp/b.md', 'tmp/c.md', 'tmp/d.md', 'tmp/e.md'];

describe('write :', function() {
  afterEach(function(cb) {
    async.each(files, function(file, next) {
      fs.exists(file, function(exists) {
        if (!exists) return cb(new Error('file does not exist:', file));
        del(file, function(err) {
          if (err) return cb(err);
          next();
        });
      });
    }, function(err) {
      if (err) return cb(err);
      cb();
    });
  });

  it('should write files asynchronously', function(cb) {
    async.each(files, function(file, next) {
      writeFile(file, 'content...', function(err) {
        if (!err) return next(err);
        next();
      });
    }, function(err) {
      if (err) return cb(err);
      cb();
    });
  });
});

describe('write sync:', function() {
  afterEach(function() {
    files.forEach(function(fp) {
      fs.existsSync(fp).should.be.true;
      try {
        del.sync(fp);
      } catch (err) {
        console.log(err);
      }
    });
  });

  it('should write files synchronously', function() {
    files.forEach(function(fp) {
      writeFile.sync(fp, '');
    });
  });
});

describe.only('write stream:', function() {
  afterEach(function() {
    fs.existsSync('a/b/c/foo.md').should.be.true;
    try {
      del.sync('a/');
    } catch (err) {
      console.log(err);
    }
  });

  it('should write files', function() {
    var file = fs.createReadStream('README.md')
      .pipe(writeFile.stream('a/b/c/foo.md'))
  });
});
