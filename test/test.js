/*!
 * delete <https://github.com/jonschlinkert/delete>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var fs = require('fs');
var del = require('delete');
var expect = require('chai').expect;
var write = require('..');

var files = ['tmp/a.md', 'tmp/b.md', 'tmp/c.md', 'tmp/d.md', 'tmp/e.md'];

describe('write:', function () {

  afterEach(function () {
    files.forEach(function(filepath) {
      expect(fs.existsSync(filepath)).to.be.true;
      try {
        del.sync(filepath);
      } catch (err) {
        console.log(err);
      }
    });
  });
  describe('sync:', function () {
    it('should write files synchronously', function () {
      files.forEach(function(filepath) {
        write.sync(filepath, '');
      });
    });
  });
});