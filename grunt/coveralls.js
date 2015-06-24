/*jslint indent: 4 */
/*global module */
module.exports = function (grunt, options) {
    'use strict';
    return {
        options: {
            force: false
        },
        coverage: {
            src: './coverage/lcov.info'
        }
    };
};
