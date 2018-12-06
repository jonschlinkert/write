/*!
 * write <https://github.com/jonschlinkert/write>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
const fs = require('fs');
const assert = require('assert');
const Readable = require('stream').Readable;
const del = require('delete');
const each = require('async-each');
const writeFile = require('./');
const files = ['tmp/a.md', 'tmp/b.md', 'tmp/c.md', 'tmp/d.md', 'tmp/e.md'];

function toStream(str) {
  const stream = new Readable();
  stream.push(str);
  stream.push(null);
  return stream;
}

describe('write', () => {
  afterEach((cb) => {
    each(files, (fp, next) => {
      fs.stat(fp, next);
    }, (err) => {
      if (err) return cb(err);
      del('tmp', cb);
    });
  });

  describe('End New Line', () => {
    it('should just write given data by default', (done) => {
      each(files, (fp, next) => {
        writeFile(fp, 'Hello!', () => {
          fs.readFile(fp, (err, fileContent) => {
            if (err) {
              return next(err);
            }

            assert.equal('Hello!', fileContent.toString());
            next();
          });
        });
      }, done);
    });

    describe('With `ensureNewLine` option to true', () => {
      it('should add a new line at the end of the file if none', (done) => {
        each(files, (fp, next) => {
          writeFile(fp, 'Hello!', { ensureNewLine: true }, () => {
            fs.readFile(fp, (err, fileContent) => {
              if (err) {
                return next(err);
              }

              assert.equal('Hello!\n', fileContent.toString());
              next();
            });
          });
        }, done);
      });

      it('should not add a new line at the end of the file if there is already one', (done) => {
        each(files, (fp, next) =>{
          writeFile(fp, 'Hello!\n', { ensureNewLine: true }, () => {
            fs.readFile(fp, (err, fileContent) => {
              if (err) {
                return next(err);
              }

              assert.equal('Hello!\n', fileContent.toString());
              next();
            });
          });
        }, done);
      });
    });
  });

  describe('async', () => {
    it('should write files', (cb) => {
      each(files, (fp, next) => {
        writeFile(fp, 'content...', next);
      }, cb);
    });

    it('should return a promise when no callback is given', (cb) => {
      each(files, (fp, next) => {
        writeFile(fp, 'content...')
          .then(() => {
            next();
          })
          .catch((err) => {
            next(err);
          });
      }, cb);
    });
  });

  describe('promise', () => {
    it('should write files using .promise', function(cb) {
      each(files, (fp, next) => {
        writeFile.promise(fp, 'content...')
          .then(() => {
            next();
          })
          .catch((err) => {
            next(err);
          });
      }, cb);
    });
  });

  describe('sync', () => {
    it('should write files using .sync', () => {
      files.forEach((fp) => {
        writeFile.sync(fp, '');
      });
    });
  });

  describe('stream', () => {
    it('should write files using .stream', function(cb) {
      each(files, (fp, next) => {
        toStream('this is content...')
          .pipe(writeFile.stream(fp))
          .on('close', next);
      }, cb);
    });

    it('should overwrite an existing file', cb => {
      //fixtures never used
      const fixtures = files.slice().concat(['tmp/e.md', 'tmp/e.md']);
      
      each(files, (fp, next) => {
        toStream('this is content...')
          .pipe(writeFile.stream(fp))
          .on('close', next);
      }, cb);
    });
  });
});

