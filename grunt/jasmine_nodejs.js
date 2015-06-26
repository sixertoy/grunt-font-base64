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
        useHelpers: false,
        stopOnFailure: false,
        specNameSuffix: ["spec.js"],
        reporters: {
            tap: true,
            teamcity: true,
            console: {
                colors: true,
                activity: true,
                verbosity: 3, // (0|false)|1|2|(3|true)
                cleanStack: 1, // (0|false)|(1|true)|2|3
                listStyle: "indent"
            },
            junit: {
                consolidate: true,
                useDotNotation: true,
                filePrefix: "junit-report",
                savePath: "./build/reports"
            }
        }
    },
    tests: {
        specs: ["spec/src/*"]
    }
};
