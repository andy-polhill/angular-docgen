"use strict";
exports.__esModule = true;
exports.clean = function (text) { return text
    .split('*')
    .map(function (line) { return line.trim().replace(/\* /, ''); })
    .filter(function (line) { return line.length; }); };
