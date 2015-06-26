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
/*globals module, require */
(function () {
    'use strict';

    // variables
    var GOOGLE_API_HOST = 'fonts.googleapis.com',
        VALID_PROTOCOL = ['http:', 'https:'],
        VALID_FORMAT = ['woff', 'woff2'],
        // requires
        URL = require('url'),
        Path = require('path'),
        Lodash = require('lodash'),
        FontStore = require('font-store/lib/fontStore'),

        /**
         *
         * Methodes utilitaires
         *
         */
        utils = {
            isValidPath: function (value) {
                if (arguments.length < 1 || Lodash.isEmpty(value) || !Lodash.isString(value)) {
                    throw new Error('options.dest needs 1 argument');
                }
                return Path.normalize(value);
            },
            isValidFormat: function (value) {
                if (arguments.length < 1 || Lodash.isEmpty(value) || !Lodash.isString(value)) {
                    throw new Error('options.format needs 1 argument');
                }
                return (VALID_FORMAT.indexOf(value.toLocaleLowerCase()) !== -1);
            },
            isValidURL: function (value) {
                var parsed;
                if (arguments.length < 1 || Lodash.isEmpty(value) || !Lodash.isString(value)) {
                    throw new Error('options.files needs 1 argument');
                }
                parsed = URL.parse(value, true, true);
                return (parsed.slashes &&
                    parsed.hostname === GOOGLE_API_HOST &&
                    parsed.pathname.indexOf('css') !== -1 &&
                    parsed.query.hasOwnProperty('family') &&
                    VALID_PROTOCOL.indexOf(parsed.protocol) !== -1 &&
                    (Lodash.isString(parsed.query.family) && !Lodash.isEmpty(parsed.query.family))
                );
            },
            toAbsolute: function (value, base) {
                base = Path.normalize(base);
                value = Path.normalize(value);
                //
                if (!Path.isAbsolute(value)) {
                    value = Path.join(base, value);
                }
                return value;
            }
        };
    /**
     *
     * Exports
     *
     */
    module.exports = function (grunt) {

        // render = null;
        grunt.registerMultiTask('font_store', 'Based on font-store@npm', function () {
            var isValidFormat, isValidPath,
                promises = [],
                done = this.async(),
                cwd = process.cwd(),
                options = this.options({
                    dest: cwd,
                    format: 'woff', // woff2
                    debug: (grunt.option('debug') === 1)
                });

            isValidPath = utils.isValidPath(options.dest);
            isValidFormat = utils.isValidFormat(options.format);

            if (!isValidPath) {
                grunt.log.error('options.dest is not valid');

            } else if (!isValidFormat) {
                grunt.log.error('options.format is not valid');

            } else {

                options.dest = utils.toAbsolute(options.dest, cwd);
                this.data.fonts.filter(function (url) {
                    return utils.isValidURL(url);
                }).map(function (url) {
                    promises.push(url);
                });

                promises.forEach(function (url, index) {

                    console.log(url);

                    FontStore(url, {
                        format: options.format
                    }, function (err, fileName, json) {

                        console.log(json);

                        if (err) {
                            console.log('Oops. An error occurred:', err.message);
                        } else {
                            console.log('Conversion successful!');
                            console.log(fileName);
                        }
                        if ((index + 1) >= promises.length) {
                            // done();
                        }
                    });
                });
            }
            done();

        });
    };
    module.exports.utils = utils;

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

  console.log('The file ' + fileName + ' contains the converted fonts.');
});
*/
