/*jslint indent: 4 */
/*global module */
// print: 'summary', // none, summary, detail, both
module.exports = {
    options: {
        match: '.',
        coverage: {
            print: 'summary'
        },
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
    all: {
        src: ['tasks/**/*.js']
    }
};
