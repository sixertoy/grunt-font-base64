/*jshint unused: false */
/*jslint indent: 4 */
/*global jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast */
(function () {

    'use strict';

    var result, helper,
        cwd = process.cwd(),
        path = require('path'),
        utils = require('../../tasks/font_store').utils;

    describe('grunt-font-store', function () {
        describe('utils', function () {
            describe('toAbsolute', function () {
                xit('return string', function () {
                    // fix
                    cwd = 'e' + cwd.substr(1);
                    // fail
                    expect(utils.toAbsolute('e:/', cwd)).toEqual('e:\\');
                    expect(utils.toAbsolute('e:', cwd)).toEqual(cwd + 'e:.');
                    //
                    expect(utils.toAbsolute('e:/npm', cwd)).toEqual('e:\\npm');
                    expect(utils.toAbsolute('e:/utils/toto', cwd)).toEqual('e:\\utils\\toto');
                    // is absolute
                    expect(utils.toAbsolute('e:/toto/tata', cwd)).toEqual('e:\\toto\\tata');
                    expect(utils.toAbsolute('e:/toto/tata/', cwd)).toEqual('e:\\toto\\tata\\');
                    expect(utils.toAbsolute('e:/toto/tata/../titi', cwd)).toEqual('e:\\toto\\titi');
                    //
                    expect(utils.toAbsolute('/toto/tata', cwd)).toEqual('\\toto\\tata');
                    // relative
                    expect(utils.toAbsolute('toto/tata', cwd)).toEqual('e:\\npm\\grunt-font-store\\toto\\tata');
                    expect(utils.toAbsolute('./toto/tata', cwd)).toEqual('e:\\npm\\grunt-font-store\\toto\\tata');
                    expect(utils.toAbsolute('toto/tata/../titi', cwd)).toEqual('e:\\npm\\grunt-font-store\\toto\\titi');
                });
            });
            describe('isValidPath', function () {
                var msg = 'options.dest needs 1 argument';
                it('throw', function () {
                    expect(function () {
                        utils.isValidPath();
                    }).toThrow();
                    expect(function () {
                        utils.isValidPath('');
                    }).toThrow();
                    expect(function () {
                        utils.isValidPath([]);
                    }).toThrow();
                    expect(function () {
                        utils.isValidPath({});
                    }).toThrow();
                    expect(function () {
                        utils.isValidPath(123);
                    }).toThrow();
                    expect(function () {
                        utils.isValidPath(null);
                    }).toThrow();
                    expect(function () {
                        utils.isValidPath(undefined);
                    }).toThrow();
                });
                xit('normalized path', function () {
                    expect(utils.isValidPath('.')).toEqual('.');
                    expect(utils.isValidPath('./')).toEqual('.\\');
                    expect(utils.isValidPath('toto')).toEqual('toto');
                    expect(utils.isValidPath('./toto/')).toEqual('toto\\');
                    expect(utils.isValidPath('./../toto/')).toEqual('..\\toto\\');
                    expect(utils.isValidPath('./../toto/tata')).toEqual('..\\toto\\tata');
                    expect(utils.isValidPath('.\\..\\toto\\tata')).toEqual('..\\toto\\tata');
                    //
                    expect(utils.isValidPath('e:/')).toEqual('e:\\');
                    expect(utils.isValidPath('e:/toto/tata')).toEqual('e:\\toto\\tata');
                    //
                    expect(utils.isValidPath('e:/toto/tata/../../titi')).toEqual('e:\\titi');
                    expect(utils.isValidPath('e:/toto/tata/../titi')).toEqual('e:\\toto\\titi');
                });
            });
            describe('isValidFormat', function () {
                var msg = 'options.format needs 1 argument';
                it('throw', function () {
                    expect(function () {
                        utils.isValidFormat();
                    }).toThrow();
                    expect(function () {
                        utils.isValidFormat('');
                    }).toThrow();
                    expect(function () {
                        utils.isValidFormat([]);
                    }).toThrow();
                    expect(function () {
                        utils.isValidFormat({});
                    }).toThrow();
                    expect(function () {
                        utils.isValidFormat(123);
                    }).toThrow();
                    expect(function () {
                        utils.isValidFormat(null);
                    }).toThrow();
                    expect(function () {
                        utils.isValidFormat(undefined);
                    }).toThrow();
                });
                it('return true', function () {
                    expect(utils.isValidFormat('woff')).toBe(true);
                    expect(utils.isValidFormat('WOFF')).toBe(true);
                    expect(utils.isValidFormat('woff2')).toBe(true);
                    expect(utils.isValidFormat('WOFF2')).toBe(true);
                });
                it('return false', function () {
                    expect(utils.isValidFormat('toto')).toBe(false);
                });
            });
            describe('isValidURL', function () {
                var msg = 'options.files needs 1 argument';
                it('throw', function () {
                    expect(function () {
                        utils.isValidURL(undefined);
                    }).toThrow();
                    expect(function () {
                        utils.isValidURL(null);
                    }).toThrow();
                    expect(function () {
                        utils.isValidURL();
                    }).toThrow();
                    expect(function () {
                        utils.isValidURL('');
                    }).toThrow();
                    expect(function () {
                        utils.isValidURL([]);
                    }).toThrow();
                    expect(function () {
                        utils.isValidURL(['toto']);
                    }).toThrow();
                    expect(function () {
                        utils.isValidURL({});
                    }).toThrow();
                    expect(function () {
                        utils.isValidURL({
                            'prop': 'string'
                        });
                    }).toThrow();
                    expect(function () {
                        utils.isValidURL();
                    }).toThrow();
                    expect(function () {
                        utils.isValidURL(1234);
                    }).toThrow();
                    expect(function () {
                        utils.isValidURL(true);
                    }).toThrow();
                });
                // Must be an valid URL
                // Must have a family get param
                // Must contains fonts.googleapis.com domain
                it('return true', function () {
                    expect(utils.isValidURL('http://fonts.googleapis.com/css?family=Dosis')).toBe(true);
                    expect(utils.isValidURL('https://fonts.googleapis.com/css?family=Dosis')).toBe(true);
                });
                it('return null', function () {
                    expect(utils.isValidURL('toto')).toBeNull();
                    expect(utils.isValidURL('toto/titi')).toBeNull();
                });
                it('return false', function () {
                    expect(utils.isValidURL('//google.com')).toBe(false);
                    expect(utils.isValidURL('ftp://google.com')).toBe(false);
                    expect(utils.isValidURL('http://google.com')).toBe(false);
                    expect(utils.isValidURL('http://192.168.1.62')).toBe(false);
                    expect(utils.isValidURL('http://googleapis.com')).toBe(false);
                    expect(utils.isValidURL('http://fonts.googleapis.com')).toBe(false);
                    expect(utils.isValidURL('http://fonts.googleapis.com/css')).toBe(false);
                    expect(utils.isValidURL('http://fonts.googleapis.com/css?')).toBe(false);
                    expect(utils.isValidURL('http://fonts.googleapis.com/?family=')).toBe(false);
                    expect(utils.isValidURL('http://fonts.googleapis.com/css?family')).toBe(false);
                    expect(utils.isValidURL('http://fonts.googleapis.com/css?family=')).toBe(false);
                    //
                    // not
                    expect(utils.isValidURL('http://fonts.googleapis.com/css?family=123')).not.toBe(false);
                    expect(utils.isValidURL('http://fonts.googleapis.com/css?family=true')).not.toBe(false);
                    expect(utils.isValidURL('http://fonts.googleapis.com/css?family=voici_un_string')).not.toBe(false);
                });
            });

        });
    });
}());
