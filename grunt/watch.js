/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {},
    tests: {
        files: ['./spec/src/**/*.spec.js', './tasks/font-store/**/*.js'],
        tasks:['jshint', 'jasmine_nodejs']
    }
};
