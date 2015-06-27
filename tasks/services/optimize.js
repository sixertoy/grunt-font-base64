/*jslint indent: 4 */
/*globals require, module */
(function () {

    'use strict';

    var FS = require('fs'),
        Path = require('path'),
        FSE = require('fs-extra'),
        Lodash = require('lodash');

    module.exports = {

        template: '@font-face{font-family:"<%=family%>";src:url(<%=uri%>) format("<%=format%>");font-weight:<%=weight%>;font-style:<%=style%>}',

        optimize: function(){

        },

        init: function (families, dest) {
            /*
            var base, fonts, css, output,
                $this = this,
                keys = Object.keys(families);

            FSE.emptyDirSync(dest);

            keys.forEach(function (family) {
                fonts = {};
                families[family].forEach(function (file) {
                    base = Path.basename(file);
                    fonts[base] = FS.readFileSync(file);
                });
                css = $this.optimize(fonts, {
                    fontFamily: family
                });
                Object.keys(css).forEach(function (prop) {
                    output = Path.join(dest, family);
                    output = output + '.' + prop + '.css';
                    FSE.writeFileSync(output, css[prop]);
                });
            });
            */
        }

    };

}());


/*
'use strict';
var path = require('path');
var _ = require('lodash');

function FontOptim(fonts, options) {
    this.fonts = fonts;
    _.extend(this, this.defaults, options);
}

FontOptim.prototype = {
    defaults: {
        fontFaceTemplate: [
   '
  ].join(''),
        fontUriTemplate: 'data:application/font-<%=format%>;charset=utf-8;base64,<%=base64%>',
        banner: '\n'
    },

    generate: function () {
        var formats = this.getCssLinesForFormats();
        formats = _.mapValues(formats, this.prependBannerAndJoinLines, this);
        return formats;
    },

    getCssLinesForFormats: function () {
        var css = {};
        for (var filename in this.fonts) {
            var format = this.getFontFormat(filename);
            if (!css[format]) {
                css[format] = [];
            }
            css[format].push(this.getFontFace(filename, format, this.fonts[filename]));
        }
        return css;
    },

    prependBannerAndJoinLines: function (lines) {
        return this.banner + lines.join('\n');
    },

    getFontFace: function (filename, format, font) {
        return _.template(this.fontFaceTemplate, {
            format: format,
            family: this.fontFamily,
            uri: this.getFontUri(format, font),
            weight: this.getFontWeight(filename),
            style: this.getFontStyle(filename)
        });
    },

    getFontUri: function (format, font) {
        var base64 = this.stringToBase64(font);
        return _.template(this.fontUriTemplate, {
            format: format,
            base64: base64
        });
    },

    getFontFormat: function (filename) {
        var extension = path.extname(filename);
        return extension.substring(1);
    },

    getFontWeight: function (filename) {
        return /bold/i.test(filename) ? 600 : 400;
    },

    getFontStyle: function (filename) {
        return /italic/i.test(filename) ? 'italic' : 'normal';
    },

    stringToBase64: function (string) {
        return new Buffer(string).toString('base64');
    }
};

module.exports = FontOptim; * /
