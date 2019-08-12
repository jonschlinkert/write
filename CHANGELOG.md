# Changelog

### v2.0.0 - 2019-08-12

**Changes**

- Refactored code
- Use `fs.createWriteStream` in the main function to improve performance.

**Added**

- Added `overwrite` option 
- Added `increment` option

See the [README](readme.md) for more details.

**Removed**

- Removed support for passing a custom string on `options.newline`. This should be done before passing the contents to `write()`
- The `.promise` method was removed since _the main export returns a promise, making the method unnecessary_.


### v1.0.2 - 2017-07-11

- improved documentation

### v1.0.0 - 2017-07-09

**Added**

- promise support

**Changed**

- The main export will now return a promise if no callback is passed