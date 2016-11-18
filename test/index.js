'use strict';

var ttyname = require('../');
var pty = require('pty.js');
var fs = require('fs');
var assert = require('assert');

describe('ttyname', function() {
  it('returns the correct name for a PTY', function() {
    var term = pty.open();
    assert.strictEqual(ttyname(term.slave._handle.fd), term.pty);
  });

  it('throws an error for invalid FDs', function() {
    assert.throws(function() {
      ttyname(-1);
    }, /Not a valid file descriptor/);
  });

  it('throws an error for non_TTYs', function() {
    assert.throws(function() {
      ttyname(fs.openSync(__filename, 'r'));
    }, /Not a TTY/);
  });
});
