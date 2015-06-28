/*jslint indent: 4 */
/*globals require, module */
(function () {

    'use strict';

    var FS = require('fs'),
        Path = require('path'),
        FSE = require('fs-extra'),
        Buffer = require('buffer'),
        Lodash = require('lodash');

    module.exports = {

        template: '@font-face{font-family:"<%=family%>";src:url(data:application/font-<%=format%>;charset=utf-8;base64,<%=base64%>) format("<%=format%>");font-weight:<%=weight%>;font-style:<%=style%>}',

        optimize: function (file) {
            var buffer = FS.readFileSync(file);
            return buffer.toString('base64');
        },

        parse: function (files, family, callback) {
            var ext, format, base, splitted, obj, content,
                result = {},
                $this = this;

            files.forEach(function (file) {
                ext = Path.extname(file);
                base = Path.basename(file, ext);
                splitted = base.split('_');
                format = ext.substr(1);
                content = '';

                var obj = {
                    format: format,
                    family: family,
                    style: splitted[1],
                    weight: splitted[2],
                    base64: $this.optimize(file)
                };
                if (!result.hasOwnProperty(format)) {
                    result[format] = {};
                }
                if (!result[format].length) {
                    result[format] = [];
                }
                result[format].push(obj);
            });
            callback(result);
        },

        stylesheets: function (parsed, dest, callback) {
            var file, types,
                result = {},
                families = Object.keys(parsed);
            families.forEach(function (fk) {
                types = Object.keys(parsed[fk]);
                types.forEach(function (tk) {
                    file = fk + '.' + tk + '.css';
                    file = Path.join(dest, file);
                    result[file] = parsed[fk][tk];
                });
            });
            callback(result);
        },

        init: function (families, dest, callback) {

            var files, file, content, compiled,
                parsed = {},
                $this = this,
                keys = Object.keys(families);

            // supp le repertoire de destination
            // FSE.emptyDirSync(dest);
            FSE.ensureDirSync(dest);


            keys.forEach(function (family) {
                files = families[family];
                $this.parse(files, family, function (res) {
                    parsed[family] = res;
                });
            });
            compiled = Lodash.template($this.template);
            this.stylesheets(parsed, dest, function (stylesheets) {
                keys = Object.keys(stylesheets);
                keys.forEach(function (fk) {
                    file = fk;
                    content = '';
                    stylesheets[fk].forEach(function (obj) {
                        content += compiled(obj);
                    });
                    FS.writeFileSync(file, content);
                });
            });
            callback();
        }

    };

}());
