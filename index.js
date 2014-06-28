/*!
 * delete <https://github.com/jonschlinkert/delete>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var mkdir = require('mkdirp');


/**
 * ## write.sync()
 *
 * Write files to disk, synchronously
 *
 * @param  {String} `dest` Destination filepath.
 * @param  {String} `str` The string to write.
 * @param  {Object} `opts`
 */

module.exports.sync = function(dest, str, opts) {
  opts = opts || {};
  opts.encoding = opts.encoding || 'utf8';

  var dirpath = path.dirname(dest);
  if (!fs.existsSync(dirpath)) {
    mkdir.sync(dirpath);
  }
  fs.writeFileSync(dest, str, opts);
};