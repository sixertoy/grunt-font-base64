/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {},
    tests: {
        files: ['./tests/specs/**/*.spec.js', './tasks/font-store/**/*.js'],
        tasks:['jshint', 'jasmine_nodejs']
    }
};
