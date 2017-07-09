/*!
 * write <https://github.com/jonschlinkert/write>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

/**
 * Asynchronously write a file to disk, creating any intermediate
 * directories first if they don't already exist.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile('foo.txt', 'This is content to write.', function(err) {
 *   if (err) console.log(err);
 * });
 * ```
 * @name writeFile
 * @param  {String} `dest` Destination file path
 * @param  {String} `str` String to write to disk.
 * @param  {Object} `options` Options to pass to [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) and [mkdirp][]
 * @param  {Function} `callback` (optional) If no callback is provided, a promise is returned.
 * @api public
 */

function writeFile(dest, str, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (typeof cb !== 'function') {
    return writeFile.promise.apply(null, arguments);
  }

  if (typeof dest !== 'string') {
    cb(new TypeError('expected dest path to be a string'));
    return;
  }

  mkdirp(path.dirname(dest), options, function(err) {
    if (err) {
      cb(err);
      return;
    }
    fs.writeFile(dest, str, options, cb);
  });
};

/**
 * Synchronously write files to disk, creating any intermediate
 * directories first if they don't already exist.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile.promise('foo.txt', 'This is content to write.')
 *   .then(function() {
 *     // do stuff
 *   });
 * ```
 * @name .promise
 * @param  {String} `dest` Destination file path
 * @param  {String|Buffer} `val` String or buffer to write to disk.
 * @param  {Object} `options` Options to pass to [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) and [mkdirp][]
 * @api public
 */

writeFile.promise = function(dest, val, options) {
  if (typeof dest !== 'string') {
    return Promise.reject(new TypeError('expected dest path to be a string'));
  }

  return new Promise(function(resolve, reject) {
    mkdirp(path.dirname(dest), options, function(err) {
      if (err) {
        reject(err);
        return;
      }

      fs.writeFile(dest, val, options, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(val);
      });
    });
  });
};

/**
 * Synchronously write files to disk, creating any intermediate
 * directories first if they don't already exist.
 *
 * ```js
 * var writeFile = require('write');
 * writeFile.sync('foo.txt', 'This is content to write.');
 * ```
 * @name .sync
 * @param  {String} `dest` Destination file path
 * @param  {String|Buffer} `val` String or buffer to write to disk.
 * @param  {Object} `options` Options to pass to [fs.writeFileSync](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options) and [mkdirp][]
 * @api public
 */

writeFile.sync = function(dest, val, options) {
  mkdirp.sync(path.dirname(dest), options);
  fs.writeFileSync(dest, val, options);
};

/**
 * Uses `fs.createWriteStream`, but also creates any intermediate
 * directories first if they don't already exist.
 *
 * ```js
 * var fs = require('fs');
 * var writeFile = require('write');
 * fs.createReadStream('README.md')
 *   .pipe(writeFile.stream('a/b/c/other-file.md'))
 *   .on('close', function() {
 *     // do stuff
 *   });
 * ```
 * @name .stream
 * @param  {String} `dest` Destination file path
 * @return  {Stream} Returns a write stream.
 * @param  {Object} `options` Options to pass to [mkdirp][] and [fs.createWriteStream](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options)
 * @api public
 */

writeFile.stream = function(dest, options) {
  mkdirp.sync(path.dirname(dest), options);
  return fs.createWriteStream(dest, options);
};

/**
 * Expose `writeFile`
 */

module.exports = writeFile;
