'use strict'
const log4js = require('log4js')
log4js.configure({
  appenders: {
    log: {type:'file', filename:'system.log'},
    out: {type:'stdout'}
  },
  categories: {
    default: {appenders: ['out'], level: 'warn'},
    develop: {appenders: ['out'], level: 'debug'}
  }
})

const logger = log4js.getLogger();

logger.debug('Hello world!');
var today = new Date();
logger.debug(today);