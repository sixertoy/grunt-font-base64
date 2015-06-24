/**
 *
 *
 * grunt-joli-markdown
 * https://github.com/malas/grunt-joli-markdown
 *
 * Copyright (c) 2015 sixertoy
 * Licensed under the MIT license.
 *
 * Building the files object dynamically
 * @see http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
 *
 */
/*jslint indent: 4, nomen:true */
/*globals module, require, process */
(function () {
    'use strict';

    var path = require('path'),
        lodash = require('lodash'),
        // FontStore = require('font-store/lib/fontStore'),

        utils = {
            validString: function (grunt, value) {
                return lodash.isString(value) && !lodash.isEmpty(value);
            },
            validArray: function (grunt, value) {
                return lodash.isArray(value);
            },
            normalizePath: function (options) {
                options.input = path.normalize(options.input);
                options.output = path.normalize(options.output);
                options.layout = path.normalize(options.layout);
            }
        };
    utils = null;

    /**
     *
     *
     *
     */
    module.exports = function (grunt) {
        grunt.registerMultiTask('font_store', 'Based on font-store@npm', function () {

            var done = this.async(),
                cwd = process.cwd();
            /*
            console.log(this);
            console.log(this.dest);
            console.log(this.filesSrc);
            */

            this.options({
                dest: cwd,
                format: 'woff', // woff2
                debug: (grunt.option('debug') === 1)
            });

            console.log(this.filesSrc);

            this.filesSrc.filter(function(){
                return true;
            }).map(function(){
                console.log(arguments);
            });

            done();

        });
    };
}());

/*
var argv = yargs
      .usage(package.description + '\nUsage: font-store [OPTIONS]... [LINK]...')
      .help('help').alias('help', 'h')
      .showHelpOnFail(false, 'Specify --help for usage and available options')
      .version(package.version, 'version').alias('version', 'V')
      .demand(1)
      .options('format', {
        alias: 'f',
        description: 'Expected font format, either "woff" or "woff2".',
        default: 'woff'
      })
      .argv,
    url = argv._[0],
    options = {
      format: argv.format
    };

fontStore(url, options, function(err, fileName, json) {
  if (err) {
    console.log('Oops. An error occurred:', err.message);
    process.exit(1);
  }

  console.log('Conversion successful!');
  console.log('The file ' + fileName + ' contains the converted fonts.');
});
*/
