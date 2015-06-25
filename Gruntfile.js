/**
 * grunt-font-store
 * https://github.com/sixertoy/grunt-font-store
 *
 * Copyright (c) 2015 sixertoy
 * Licensed under the MIT license.
 *
 */
/*jslint plusplus: true, indent: 4 */
/*global module, require */
module.exports = function (grunt) {
    'use strict';
    // load configs
    require('load-grunt-config')(grunt);
    grunt.loadTasks('tasks/font-store');
};
