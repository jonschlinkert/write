/*!
 * write <https://github.com/jonschlinkert/write>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var mkdir = require('mkdirp');
var exists = require('fs-exists-sync');

/**
 * Asynchronously write a file to disk, creating any intermediate
 * directories along the way if they don't already exist.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile('foo.txt', 'This is content to write.', function(err) {
 *   if (err) console.log(err);
 * });
 * ```
 *
 * @name writeFile
 * @param  {String} `dest` Destination file path
 * @param  {String} `str` String to write to disk.
 * @param  {Function} `callback`
 * @api public
 */

function writeFile(dest, str, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var dir = path.dirname(dest);
  fs.stat(dir, function(err, stats) {
    if (err && err.code !== 'ENOENT') {
      cb(err);
      return;
    }

    if (!err) {
      fs.writeFile(dest, str, options, cb);
    } else {
      mkdir(dir, function(err) {
        if (err) {
          return cb(err);
        } else {
          fs.writeFile(dest, str, options, cb);
        }
      });
    }
  });
};

/**
 * Synchronously write files to disk, creating any intermediate
 * directories along the way if they don't already exist.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile.sync('foo.txt', 'This is content to write.');
 * ```
 *
 * @name .writeFile.sync
 * @param  {String} `dest` Destination file path
 * @param  {String} `str` String to write to disk.
 * @api public
 */

writeFile.sync = function(dest, str, options) {
  createDirectory(dest, options);
  fs.writeFileSync(dest, str, options);
};

/**
 * Uses `fs.createWriteStream`, but also creates any intermediate
 * directories along the way if they don't already exist.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile.stream('foo.txt');
 * ```
 *
 * @name .writeFile.stream
 * @param  {String} `dest` Destination file path
 * @return  {Stream} Returns a write stream.
 * @api public
 */

writeFile.stream = function(dest, options) {
  createDirectory(dest, options);
  return fs.createWriteStream(dest);
};

/**
 * Create a directory if it doesn't already exist
 */

function createDirectory(dest, options) {
  if (options && typeof options !== 'object') {
    options = {};
  }

  var dir = path.dirname(dest);
  if (exists(dir)) return;
  mkdir.sync(dir, options);
}

/**
 * Expose `writeFile`
 */

module.exports = writeFile;
