
const writeFile = require('./');
const Readable = require('stream').Readable;

function toStream(str) {
  const stream = new Readable();
  stream.push(str);
  stream.push(null);
  return stream;
}

toStream('fooo')
  .pipe(writeFile.stream('tmp/a/b/c/foo.md'))
  .on('close', () => {
    console.log('done');
  });
