const cron = require('node-cron');
const config = require('../helpers/configReader');
const seasonPeriod = config.seasonPeriod || '1d';
const log = require('../helpers/log');
log.info('Cron started season period ' + seasonPeriod);

let pattern;

// 'min(0-59) hours(0-23) d_mon(1-31) mon(1-12) d_week(0-7)'

switch (seasonPeriod) {

case ('1h'):
    pattern = '0 0-23 * * *';
    break;

case ('1d'):
    pattern = '0 0 1-31 * *';
    break;

case ('5d'):
    pattern = '0 0 1,5,10,15,20,25 * *';
    break;

case ('10d'):
    pattern = '0 0 1,10,20 * *';
    break;

case ('15d'):
    pattern = '0 0 1,15 * *';
    break;

case ('30d'):
    pattern = '0 0 1 * *';
    break;

}

cron.schedule(pattern, () => {

});
