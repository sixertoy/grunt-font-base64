/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        cwd: '.',
        livereload: false,
        livereloadOnError: false
    },
    compile: {
        files: ['./src/**/*.js'],
        tasks: ['wrap:commonjs', 'jshint']
    },
    jasmine: {
        files: ['./tests/specs/**/*.spec.js', 'app/**/*.js'],
        tasks: ['jasmine_node']
    }
};
