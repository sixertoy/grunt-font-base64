/* jslint indent:4, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var Path = require('path'),
        Request = require('request'),
        CSSparser = require('cssparser'),
        parser = new CSSparser.Parser();


    module.exports = {

        options: {
            fonts: [],
            errors: false,
            request: {
                url: '',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1944.0 Safari/537.36'
                }
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
                splitter = '_';
            if (obj.hasOwnProperty('declarations')) {
                dcl = obj.declarations;
                if (dcl.hasOwnProperty('font-family') && dcl.hasOwnProperty('font-style') && dcl.hasOwnProperty('font-weight')) {
                    result = dcl['font-family'];
                    // replace simple quote + white space
                    result = result.replace(/['\s]*/g, '');
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
                    return result[0].trim();
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
            var json, cssrules, dest, src, filename,
                err = false,
                $this = this,
                result = false;
            this.options.request.url = url;
            Request(this.options.request, function (err, res, body) {
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
                                    data: body,
                                    dest: filename + Path.extname(src)
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

        end: function(){

        },

        /**
         *
         * Lance la tache recuperation des fonts
         *
         */
        start: function (callback) {
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
                                    body: obj.data
                                }
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
