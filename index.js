'use strict';
var ffi = require('ffi');
var fs = require('fs');
var os = require('os');
var constants = require('constants');

var errors = (os.constants && os.constants.errno) || require('constants');

var lib = ffi.Library(null, {
  'ttyname_r': [ 'int', [ 'int', 'pointer', 'size_t' ] ]
});

function ttyname(fd) {
  if (fd === undefined) {
    fd = 0;
  }

  var buf = new Buffer(256);

  while (true) {
    var ret = lib.ttyname_r(fd, buf, buf.length);
    if (ret === 0) {
      var end = buf.indexOf ?
          buf.indexOf(0) :
          Array.prototype.slice.call(buf).indexOf(0);

      if (end === -1) {
        end = buf.length;
      }

      return buf.toString('utf8', 0, end);
    } else {
      var errno = ffi.errno();
      if (errno === errors.ERANGE) {
        buf = new Buffer(buf.length * 2);
        continue;
      }

      var error;
      if (errno === errors.ENOTTY) {
        error = new Error('ttyname_r: Not a TTY');
        error.code = 'ENOTTY';
      } else if (errno === errors.EBADF) {
        error = new Error('ttyname_r: Not a valid file descriptor');
        error.code = 'EBADF';
      } else {
        error = new Error('ttyname_r: Unknown error: ' + errno);
      }

      throw error;
    }
  }
}

module.exports = ttyname;
