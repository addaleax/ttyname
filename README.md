ttyname
==============

[![NPM Version](https://img.shields.io/npm/v/ttyname.svg?style=flat)](https://npmjs.org/package/ttyname)
[![Build Status](https://travis-ci.org/addaleax/ttyname.svg?style=flat&branch=master)](https://travis-ci.org/addaleax/ttyname?branch=master)

[ttyname(3)](http://man7.org/linux/man-pages/man3/ttyname.3.html) for Node using FFI. (POSIX only.)

Install:
`npm install ttyname`

```js
const ttyname = require('ttyname');

ttyname(fd); // Returns the TTY name for `fd`, e.g. /dev/pts/18.
ttyname();   // Returns the TTY name for stdin.
```

License
=======

MIT
