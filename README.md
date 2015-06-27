# grunt-font-base64 [![Built with Grunt][grunt-img]](http://gruntjs.com/)

[![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![Build][travis-img]][travis-url]

* A Grunt task based on fontoptim

## Install

```bash
npm i grunt-font-base64 --save-dev
```

## Usage

### Config
```json
    options: {
        dest: './build'
    },
    all: {
        fonts: ['Gruntfile.js', 'http://fonts.googleapis.com/css?family=Droid+Sans:700', 'http://fonts.googleapis.com/css?family=Droid+Sans', 'http://fonts.googleapis.com/css?family=Open+Sans', 'http://fonts.googleapis.com/css?family=Droid+Sans:400,700']
    }
```
***Droid Sans*** will not be duplicated<br/>
***Gruntfile.js*** will not fail and not be encoding of course...<br/>

### Command Line
```bash
grunt font_base64 --debug
```

## Issues

[grunt-img]: https://cdn.gruntjs.com/builtwith.png
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[npm-url]: https://npmjs.org/package/grunt-font-base64
[npm-version-img]: http://img.shields.io/npm/v/grunt-font-base64.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/grunt-font-base64.svg?style=flat-square

[coverall-url]: https://coveralls.io/r/sixertoy/grunt-font-base64
[coverall-img]: https://img.shields.io/coveralls/sixertoy/grunt-font-base64.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/grunt-font-base64
[travis-img]: http://img.shields.io/travis/sixertoy/grunt-font-base64.svg?style=flat-square
