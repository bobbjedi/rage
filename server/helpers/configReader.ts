const fs = require('fs');
const configJson = fs.readFileSync(__dirname + '/../../config.js')
    .toString()
    .replace('export default', '')
    .replace(';', '');
const config = eval('(' + configJson + ')');

export default config;
