/*jslint indent:4, plusplus: true */
/*globals module, require */
(function () {

    'use strict';

    var FS = require('fs'),
        Path = require('path'),
        grunt = require('grunt'),
        FSE = require('fs-extra'),
        request = require('request');

    module.exports = {

        options: {},

        downloadFont: function (url, filename, callback) {
            var writer, extension,
                file,
                index = 0,
                err = false,
                stream = false;

            writer = request.get(url);
            writer.on('response', function (res) {
                grunt.log.debug('request on response');
                if (res.statusCode === 200) {
                    grunt.log.debug('content-type: ' + res.headers['content-type']);
                    file = filename + Path.extname(url);
                    stream = FS.createWriteStream(file);
                } else {
                    err = 'Unable to download ' + url;
                }
            }).on('error', function (err) {
                grunt.log.error(err);

            }).on('data', function (chunk) {
                stream.write(chunk);

            }).on('end', function () {
                if (stream) {
                    grunt.log.debug('Downloaded ' + file);
                    stream.end();
                }
                callback(err, file);
            });
        },

        downloadFamily: function (obj, file, callback) {
            var index = 0,
                files = [],
                errors = [],
                $this = this,
                length = obj.src.length;

            obj.src.forEach(function (url) {
                $this.downloadFont(url, file, function (err, file) {
                    if (err) {
                        errors.push(err);
                    }
                    if (file) {
                        files.push(file);
                    }
                    if (index >= (length - 1)) {
                        callback(errors, files);
                    }
                    index++;
                });
            });
        },

        init: function (data, base, callback) {
            var file, urls, family,
                index = 0,
                result = {},
                errors = [],
                $this = this,
                keys = Object.keys(data),
                length = keys.length;

            // create destination directory
            // FSE.emptyDirSync(base);
            FSE.mkdirpSync(base);

            // download files
            keys.forEach(function (filename) {
                file = Path.join(base, filename);
                $this.downloadFamily(data[filename], file, function (err, files) {
                    family = data[filename].family;
                    if (err.length) {
                        errors = errors.concat(err);
                    }
                    if (files.length) {
                        if (!result.hasOwnProperty(family)) {
                            result[family] = [];
                        }
                        result[family] = result[family].concat(files);
                    }
                    if (index >= (length - 1)) {
                        callback(errors, result);
                    }
                    index++;
                });
            });
        }
    };

}());
