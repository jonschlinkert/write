# write [![NPM version](https://img.shields.io/npm/v/write.svg?style=flat)](https://www.npmjs.com/package/write) [![NPM monthly downloads](https://img.shields.io/npm/dm/write.svg?style=flat)](https://npmjs.org/package/write) [![NPM total downloads](https://img.shields.io/npm/dt/write.svg?style=flat)](https://npmjs.org/package/write) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/write.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/write)

> Write files to disk, by first creating intermediate directories if they don't exist, then passing through to node's native fs methods.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save write
```

## Usage

```js
var writeFile = require('write');
```

## API

### [writeFile](index.js#L32)

Asynchronously write a file to disk, creating any intermediate directories first if they don't already exist.

**Params**

* `dest` **{String}**: Destination file path
* `str` **{String}**: String to write to disk.
* `options` **{Object}**: Options to pass to [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) and [mkdirp](https://github.com/substack/node-mkdirp)
* `callback` **{Function}**: (optional) If no callback is provided, a promise is returned.

**Example**

```js
var writeFile = require('write');
writeFile('foo.txt', 'This is content to write.', function(err) {
  if (err) console.log(err);
});
```

### [.promise](index.js#L74)

Synchronously write files to disk, creating any intermediate directories first if they don't already exist.

**Params**

* `dest` **{String}**: Destination file path
* `val` **{String|Buffer}**: String or buffer to write to disk.
* `options` **{Object}**: Options to pass to [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) and [mkdirp](https://github.com/substack/node-mkdirp)

**Example**

```js
var writeFile = require('write');
writeFile.promise('foo.txt', 'This is content to write.')
  .then(function() {
    // do stuff
  });
```

### [.sync](index.js#L112)

Synchronously write files to disk, creating any intermediate directories first if they don't already exist.

**Params**

* `dest` **{String}**: Destination file path
* `val` **{String|Buffer}**: String or buffer to write to disk.
* `options` **{Object}**: Options to pass to [fs.writeFileSync](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options) and [mkdirp](https://github.com/substack/node-mkdirp)

**Example**

```js
var writeFile = require('write');
writeFile.sync('foo.txt', 'This is content to write.');
```

### [.stream](index.js#L137)

Uses `fs.createWriteStream`, but also creates any intermediate directories first if they don't already exist.

**Params**

* `dest` **{String}**: Destination file path
* `options` **{Object}**: Options to pass to [mkdirp](https://github.com/substack/node-mkdirp) and [fs.createWriteStream](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options)
* `returns` **{Stream}**: Returns a write stream.

**Example**

```js
var fs = require('fs');
var writeFile = require('write');
fs.createReadStream('README.md')
  .pipe(writeFile.stream('a/b/c/other-file.md'))
  .on('close', function() {
    // do stuff
  });
```

## Release history

### v1.0.0 - 2017-07-09

**Added**

* [promise support](#promise)

**Changed**

* The main will now return a promise if no callback is passed

## About

### Related projects

* [delete](https://www.npmjs.com/package/delete): Delete files and folders and any intermediate directories if they exist (sync and async). | [homepage](https://github.com/jonschlinkert/delete "Delete files and folders and any intermediate directories if they exist (sync and async).")
* [read-data](https://www.npmjs.com/package/read-data): Read JSON or YAML files. | [homepage](https://github.com/jonschlinkert/read-data "Read JSON or YAML files.")
* [read-json](https://www.npmjs.com/package/read-json): Reads and parses a JSON file. | [homepage](https://github.com/n-johnson/read-json#readme "Reads and parses a JSON file.")
* [read-yaml](https://www.npmjs.com/package/read-yaml): Very thin wrapper around js-yaml for directly reading in YAML files. | [homepage](https://github.com/jonschlinkert/read-yaml "Very thin wrapper around js-yaml for directly reading in YAML files.")
* [write-json](https://www.npmjs.com/package/write-json): Write a JSON file to disk, also creates intermediate directories in the destination path if… [more](https://github.com/jonschlinkert/write-json) | [homepage](https://github.com/jonschlinkert/write-json "Write a JSON file to disk, also creates intermediate directories in the destination path if they don't already exist.")
* [write-yaml](https://www.npmjs.com/package/write-yaml): Write YAML. Converts JSON to YAML writes it to the specified file. | [homepage](https://github.com/jonschlinkert/write-yaml "Write YAML. Converts JSON to YAML writes it to the specified file.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 26 | [jonschlinkert](https://github.com/jonschlinkert) |
| 1 | [tunnckoCore](https://github.com/tunnckoCore) |

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on July 09, 2017._