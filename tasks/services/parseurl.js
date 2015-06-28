/*jslint indent:4, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var Path = require('path'),
        grunt = require('grunt'),
        request = require('request'),
        CSSparser = require('cssparser'),
        parser = new CSSparser.Parser();


    module.exports = {

        options: {
            fonts: [],
            errors: false,
            headers: {
                woffx: 'Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0', // woff+ woff2
                woff2: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1944.0 Safari/537.36',
                ttf: 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_2; en-gb) AppleWebKit/526+ (KHTML, like Gecko) Version/3.1 iPhone'
            }
        },

        /**
         *
         * Returns a file name from an
         * css parsed object
         *
         */
        filename: function (obj) {
            var dcl,
                result = '',
                $this = this,
                splitter = '_';
            if (obj.hasOwnProperty('declarations')) {
                dcl = obj.declarations;
                if (dcl.hasOwnProperty('font-family') && dcl.hasOwnProperty('font-style') && dcl.hasOwnProperty('font-weight')) {
                    result = $this.family(obj);
                    result += splitter + dcl['font-style'];
                    result += splitter + dcl['font-weight'];
                    return result;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },

        family: function (obj) {
            var dcl, result;
            if (obj.hasOwnProperty('declarations')) {
                dcl = obj.declarations;
                if (dcl.hasOwnProperty('font-family')) {
                    result = dcl['font-family'];
                    result = result.replace(/['\s]*/g, '');
                    return result;
                } else {
                    grunt.log.error('Unable to parse font-family');
                }
            }
        },

        /**
         *
         * Returns Google Font URL
         *
         */
        source: function (obj) {
            var dcl, result;
            if (obj.hasOwnProperty('declarations')) {
                dcl = obj.declarations;
                if (dcl.hasOwnProperty('src')) {
                    result = dcl.src.match(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gi);
                    return result;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },

        /**
         *
         * Add an error message to
         * Errors stack
         *
         */
        error: function (msg) {
            if (arguments.length < 1) {
                return this.options.errors;
            }
            if (!this.options.errors) {
                this.options.errors = [];
            }
            this.options.errors.push(msg);
            return this;
        },

        /**
         *
         * Add a Google Font to parse
         *
         */
        add: function (url) {
            this.options.fonts.push(url);
            return this;
        },

        /**
         *
         * Returns an entry
         * From fonts stack
         *
         */
        get: function (index) {
            var length = this.options.fonts.length;
            if (length && (index < length)) {
                return this.options.fonts[index];
            }
            return '';
        },

        /**
         *
         *
         *
         */
        load: function (url, cb) {
            var json, cssrules, dest, src, filename, name,
                index = 0,
                err = false,
                $this = this,
                result = false,
                extensions = ['woffx'],
                length = extensions.length,
                requestOptions = {
                    url: url,
                    headers: {
                        'User-Agent': $this.options.headers.woffx
                    }
                };

            request(requestOptions, function (err, res, body) {
                if (err || res.statusCode !== 200) {
                    err = 'Unable to load :: ' + url;
                } else {
                    json = parser.parse(body);
                    cssrules = json.rulelist;
                    cssrules.forEach(function (obj) {
                        filename = $this.filename(obj);
                        if (filename) {
                            src = $this.source(obj);
                            if (src) {
                                if (!result) {
                                    result = [];
                                }
                                result.push({
                                    src: src,
                                    dest: filename,
                                    data: JSON.stringify(obj),
                                    family: $this.family(obj)
                                });
                            } else {
                                err = 'Incorrect format :: ' + url;
                            }
                        } else {
                            err = 'Incorrect format :: ' + url;
                        }
                    });
                }
                cb(err, result);
            });
        },

        /**
         *
         * Lance la tache recuperation des fonts
         *
         */
        init: function (callback) {
            var index = 0,
                data = false,
                $this = this,
                length = this.options.fonts.length;

            this.options.fonts.forEach(function (url) {
                $this.load(url, function (err, res) {
                    if (err) {
                        $this.error(err);
                    } else {
                        if (!data) {
                            data = {};
                        }
                        res.forEach(function (obj) {
                            if (!data.hasOwnProperty(obj.dest)) {
                                data[obj.dest] = {
                                    src: obj.src,
                                    body: obj.data,
                                    family: obj.family
                                };
                            }
                        });
                        if (index >= (length - 1)) {
                            callback($this.error(), data);
                        }
                    }
                    index++;
                });
            });
        }
    };

}());
