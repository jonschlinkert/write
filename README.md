# write [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=W8YFZ425KND68) [![NPM version](https://img.shields.io/npm/v/write.svg?style=flat)](https://www.npmjs.com/package/write) [![NPM monthly downloads](https://img.shields.io/npm/dm/write.svg?style=flat)](https://npmjs.org/package/write) [![NPM total downloads](https://img.shields.io/npm/dt/write.svg?style=flat)](https://npmjs.org/package/write) [![Build Status](https://travis-ci.org/jonschlinkert/write.svg?branch=master)](https://travis-ci.org/jonschlinkert/write)

> Write data to a file, replacing the file if it already exists and creating any intermediate directories if they don't already exist. Thin wrapper around node's native fs methods.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/) (requires [Node.js](https://nodejs.org/en/) >=10):

```sh
$ npm install --save write
```

## Usage

```js
const write = require('write');
```

## Options

The following options may be used with any method.

### options.newline

**Type**: `boolean`

**Default**: `undefined`

Ensure that contents has a trailing newline before writing it to the file system.

```js
write.sync('foo.txt', 'some data...', { newline: true }); 
```

### options.overwrite

**Type**: `boolean`

**Default**: `undefined`

Set to `false` to prevent existing files from being overwritten. See [increment](#optionsincrement) for a less severe alternative.

```js
write.sync('foo.txt', 'some data...', { overwrite: false });
```

### options.increment

**Type**: `boolean`

**Default**: `undefined`

Set to `true` to automatically rename files by appending an increment, like `foo (2).txt`, to prevent `foo.txt` from being overwritten. This is useful when writing log files, or other information where the file name is less important than the contents being written.

```js
write.sync('foo.txt', 'some data...', { increment: true });
// if "foo.txt" exists, the file will be renamed to "foo (2).txt"
```

## API

### [write](index.js#L41)

Asynchronously writes data to a file, replacing the file if it already exists and creating any intermediate directories if they don't already exist. Data can be a string or a buffer. Returns a promise if a callback function is not passed.

**Params**

* `filepath` **{String}**: file path.
* `data` **{String|Buffer|Uint8Array}**: Data to write.
* `options` **{Object}**: Options to pass to [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
* `callback` **{Function}**: (optional) If no callback is provided, a promise is returned.
* `returns` **{Object}**: Returns an object with the `path` and `contents` of the file that was written to the file system. This is useful for debugging when `options.increment` is used and the path might have been modified.

**Example**

```js
const write = require('write');

// async/await
(async () => {
  await write('foo.txt', 'This is content...');
})();

// promise
write('foo.txt', 'This is content...')
  .then(() => {
    // do stuff
  });

// callback
write('foo.txt', 'This is content...', err => {
  // do stuff with err
});
```

### [.sync](index.js#L88)

The synchronous version of [write](#write). Returns undefined.

**Params**

* `filepath` **{String}**: file path.
* `data` **{String|Buffer|Uint8Array}**: Data to write.
* `options` **{Object}**: Options to pass to [fs.writeFileSync](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)
* `returns` **{Object}**: Returns an object with the `path` and `contents` of the file that was written to the file system. This is useful for debugging when `options.increment` is used and the path might have been modified.

**Example**

```js
const write = require('write');
write.sync('foo.txt', 'This is content...');
```

### [.stream](index.js#L127)

Returns a new [WriteStream](https://nodejs.org/api/fs.html#fs_class_fs_writestream) object. Uses `fs.createWriteStream` to write data to a file, replacing the file if it already exists and creating any intermediate directories if they don't already exist. Data can be a string or a buffer.

**Params**

* `filepath` **{String}**: file path.
* `options` **{Object}**: Options to pass to [fs.createWriteStream](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options)
* `returns` **{Stream}**: Returns a new [WriteStream](https://nodejs.org/api/fs.html#fs_class_fs_writestream) object. (See [Writable Stream](https://nodejs.org/api/stream.html#stream_class_stream_writable)).

**Example**

```js
const fs = require('fs');
const write = require('write');
fs.createReadStream('README.md')
  .pipe(write.stream('a/b/c/other-file.md'))
  .on('close', () => {
    // do stuff
  });
```

## Release history

See [CHANGELOG.md].

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Related projects

You might also be interested in these projects:

* [add-filename-increment](https://www.npmjs.com/package/add-filename-increment): When copying or moving files, it's common for operating systems to automatically add an increment… [more](https://github.com/jonschlinkert/add-filename-increment) | [homepage](https://github.com/jonschlinkert/add-filename-increment "When copying or moving files, it's common for operating systems to automatically add an increment or 'copy' to duplicate file names. This does that for Node.js applications, with automatic platform detection and support for Linux, MacOs, and Windows conve")
* [delete](https://www.npmjs.com/package/delete): Delete files and folders and any intermediate directories if they exist (sync and async). | [homepage](https://github.com/jonschlinkert/delete "Delete files and folders and any intermediate directories if they exist (sync and async).")
* [read-data](https://www.npmjs.com/package/read-data): Read JSON or YAML files. | [homepage](https://github.com/jonschlinkert/read-data "Read JSON or YAML files.")
* [read-yaml](https://www.npmjs.com/package/read-yaml): Very thin wrapper around js-yaml for directly reading in YAML files. | [homepage](https://github.com/jonschlinkert/read-yaml "Very thin wrapper around js-yaml for directly reading in YAML files.")
* [strip-filename-increment](https://www.npmjs.com/package/strip-filename-increment): Operating systems commonly add a trailing increment, or the word 'copy', or something similar to… [more](https://github.com/jonschlinkert/strip-filename-increment) | [homepage](https://github.com/jonschlinkert/strip-filename-increment "Operating systems commonly add a trailing increment, or the word 'copy', or something similar to duplicate files. This strips those increments. Tested on Windows, MacOS, and Linux.")
* [write-data](https://www.npmjs.com/package/write-data): Write a YAML or JSON file to disk. Automatically detects the format to write based… [more](https://github.com/jonschlinkert/write-data) | [homepage](https://github.com/jonschlinkert/write-data "Write a YAML or JSON file to disk. Automatically detects the format to write based on extension. Or pass `ext` on the options.")
* [write-json](https://www.npmjs.com/package/write-json): Write a JSON file to disk, also creates intermediate directories in the destination path if… [more](https://github.com/jonschlinkert/write-json) | [homepage](https://github.com/jonschlinkert/write-json "Write a JSON file to disk, also creates intermediate directories in the destination path if they don't already exist.")
* [write-yaml](https://www.npmjs.com/package/write-yaml): Write YAML. Converts JSON to YAML writes it to the specified file. | [homepage](https://github.com/jonschlinkert/write-yaml "Write YAML. Converts JSON to YAML writes it to the specified file.")

### Contributors

| **Commits** | **Contributor** |  
| --- | --- |  
| 42 | [jonschlinkert](https://github.com/jonschlinkert) |  
| 2  | [jpetitcolas](https://github.com/jpetitcolas) |  
| 1  | [tunnckoCore](https://github.com/tunnckoCore) |  

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2019, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.8.0, on September 04, 2019._