'use strict';

const { Readable } = require('stream');
const write = require('./');

const toStream = data => {
  const stream = new Readable();
  stream.push(data);
  stream.push(null);
  return stream;
};

toStream('fooo')
  .pipe(write.stream('tmp/a/b/c/foo.md'))
  .on('close', () => console.log('done'));
