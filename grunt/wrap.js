/*jslint indent: 4 */
/*global module */
module.exports = function (grunt, options) {
    'use strict';
    return {
        commonjs: {
            expand: true,
            cwd: './src/',
            dest: './app/',
            src: ['**/*.js'],
            options: {
                indent: '\t',
                wrapper: ['/*jslint indent:4, nomen:true */\n/*global require */\n(function () {\n\t\'use strict\';\n', '\n}());']
            }
        }
    };
};
