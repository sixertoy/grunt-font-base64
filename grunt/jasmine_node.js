/**
 *
 * Config for grunt-jasmine-nodejs
 * https://github.com/onury/grunt-jasmine-nodejs
 *
 */
/*jslint indent:4 */
/*globals module */
module.exports = {
    options: {
        match: '.',
        verbose: true,
        matchall: false,
        forceExit: true,
        extensions: 'js',
        specNameMatcher: 'spec'
    },
    all: ['spec/']
};