/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var result, helper,
        cwd = process.cwd(),
        Helper = require();

    describe('Helper', function () {

        beforeEach(function(){
            // helper = new Helper();
        });

        it('Expect something', function(){
            expect(function(){
                result = helper.render();
            }).toThrow();
        });

        afterEach(function(){
            // helper = null;
        });

    });

}());
