/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var result, helper,
        cwd = process.cwd(),
        Helper = require(cwd + '/tasks/font_store');

    describe('grunt-font-store', function () {

        xit('Expect something', function(){
            expect(function(){
                result = helper.render();
            }).toThrow();
        });

    });

}());
