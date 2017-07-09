
var writeFile = require('./');
var Readable = require('stream').Readable;

function toStream(str) {
  var stream = new Readable();
  stream.push(str);
  stream.push(null);
  return stream;
}

toStream('fooo')
  .pipe(writeFile.stream('tmp/a/b/c/foo.md'))
  .on('close', function() {
    console.log('done');
  })
