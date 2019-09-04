'use strict';

const fs = require('fs');
const path = require('path');
const increment = require('add-filename-increment');

/**
 * Asynchronously writes data to a file, replacing the file if it already
 * exists and creating any intermediate directories if they don't already
 * exist. Data can be a string or a buffer. Returns a promise if a callback
 * function is not passed.
 *
 * ```js
 * const write = require('write');
 *
 * // async/await
 * (async () => {
 *   await write('foo.txt', 'This is content...');
 * })();
 *
 * // promise
 * write('foo.txt', 'This is content...')
 *   .then(() => {
 *     // do stuff
 *   });
 *
 * // callback
 * write('foo.txt', 'This is content...', err => {
 *   // do stuff with err
 * });
 * ```
 * @name write
 * @param {String} `filepath` file path.
 * @param {String|Buffer|Uint8Array} `data` Data to write.
 * @param {Object} `options` Options to pass to [fs.writeFile][writefile]
 * @param {Function} `callback` (optional) If no callback is provided, a promise is returned.
 * @returns {Object} Returns an object with the `path` and `contents` of the file that was written to the file system. This is useful for debugging when `options.increment` is used and the path might have been modified.
 * @api public
 */

const write = (filepath, data, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const opts = { encoding: 'utf8', ...options };
  const destpath = opts.increment ? incrementName(filepath, options) : filepath;
  const result = { path: destpath, data };

  if (opts.overwrite === false && exists(filepath, destpath)) {
    throw new Error('File already exists: ' + destpath);
  }

  const promise = mkdir(path.dirname(destpath), { recursive: true, ...options })
    .then(() => {
      return new Promise((resolve, reject) => {
        fs.createWriteStream(destpath, opts)
          .on('error', err => reject(err))
          .on('close', resolve)
          .end(ensureNewline(data, opts));
      });
    });

  if (typeof callback === 'function') {
    promise.then(() => callback(null, result)).catch(callback);
    return;
  }

  return promise.then(() => result);
};

/**
 * The synchronous version of [write](#write). Returns undefined.
 *
 * ```js
 * const write = require('write');
 * write.sync('foo.txt', 'This is content...');
 * ```
 * @name .sync
 * @param {String} `filepath` file path.
 * @param {String|Buffer|Uint8Array} `data` Data to write.
 * @param {Object} `options` Options to pass to [fs.writeFileSync][writefilesync]
 * @returns {Object} Returns an object with the `path` and `contents` of the file that was written to the file system. This is useful for debugging when `options.increment` is used and the path might have been modified.
 * @api public
 */

write.sync = (filepath, data, options) => {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }

  const opts = { encoding: 'utf8', ...options };
  const destpath = opts.increment ? incrementName(filepath, options) : filepath;

  if (opts.overwrite === false && exists(filepath, destpath)) {
    throw new Error('File already exists: ' + destpath);
  }

  mkdirSync(path.dirname(destpath), { recursive: true, ...options });
  fs.writeFileSync(destpath, ensureNewline(data, opts), opts);
  return { path: destpath, data };
};

/**
 * Returns a new [WriteStream][writestream] object. Uses `fs.createWriteStream`
 * to write data to a file, replacing the file if it already exists and creating
 * any intermediate directories if they don't already exist. Data can be a string
 * or a buffer.
 *
 * ```js
 * const fs = require('fs');
 * const write = require('write');
 * fs.createReadStream('README.md')
 *   .pipe(write.stream('a/b/c/other-file.md'))
 *   .on('close', () => {
 *     // do stuff
 *   });
 * ```
 * @name .stream
 * @param {String} `filepath` file path.
 * @param {Object} `options` Options to pass to [fs.createWriteStream][wsoptions]
 * @return {Stream} Returns a new [WriteStream][writestream] object. (See [Writable Stream][writable]).
 * @api public
 */

write.stream = (filepath, options) => {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }

  const opts = { encoding: 'utf8', ...options };
  const destpath = opts.increment ? incrementName(filepath, options) : filepath;

  if (opts.overwrite === false && exists(filepath, destpath)) {
    throw new Error('File already exists: ' + filepath);
  }

  mkdirSync(path.dirname(destpath), { recursive: true, ...options });
  return fs.createWriteStream(destpath, opts);
};

/**
 * Increment the filename if the file already exists and enabled by the user
 */

const incrementName = (destpath, options = {}) => {
  if (options.increment === true) options.increment = void 0;
  return increment(destpath, options);
};

/**
 * Ensure newline at EOF if defined on options
 */

const ensureNewline = (data, options) => {
  if (!options || options.newline !== true) return data;
  if (typeof data !== 'string' && !isBuffer(data)) {
    return data;
  }

  // Only call `.toString()` on the last character. This way,
  // if data is a buffer, we don't need to stringify the entire
  // buffer just to append a newline.
  if (String(data.slice(-1)) !== '\n') {
    if (typeof data === 'string') {
      return data + '\n';
    }
    return data.concat(Buffer.from('\n'));
  }

  return data;
};

// if filepath !== destpath, that means the user has enabled
// "increment", which has already checked the file system and
// renamed the file to avoid conflicts, so we don't need to
// check again.
const exists = (filepath, destpath) => {
  return filepath === destpath && fs.existsSync(filepath);
};

const mkdir = (dirname, options) => {
  return new Promise(resolve => fs.mkdir(dirname, options, () => resolve()));
};

const mkdirSync = (dirname, options) => {
  try {
    fs.mkdirSync(dirname, options);
  } catch (err) { /* do nothing */ }
};

const isBuffer = data => {
  if (data.constructor && typeof data.constructor.isBuffer === 'function') {
    return data.constructor.isBuffer(data);
  }
  return false;
};

/**
 * Expose `write`
 */

module.exports = write;
