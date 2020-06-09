"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const configJson = fs.readFileSync(__dirname + '/../../config.js')
    .toString()
    .replace('export default', '')
    .replace(';', '');
const config = eval('(' + configJson + ')');
exports.default = config;
//# sourceMappingURL=configReader.js.map