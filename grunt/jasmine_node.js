/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        match: '.',
        coverage: {},
        matchAll: false,
        forceExit: true,
        extensions: 'js',
        showColors: true,
        specFolders: ['tests'],
        specNameMatcher: 'spec',
        captureExceptions: true,
        junitreport: {
            report: false,
            consolidate: true,
            useDotNotation: true,
            savePath: './build/reports/jasmine/'
        }
    },
    src: ['app/**/*.js']
};
