

'use strict'
const log4js = require('log4js')
log4js.configure({
  appenders: {
    log: {type:'file', filename:'system.log'},
    out: {type:'stdout'}
  },
  categories: {
    default: {appenders: ['out'], level: 'info'},
    develop: {appenders: ['out'], level: 'debug'},
    runnning: {appenders: ['log'], level: 'warn'}
  }
})

const logger = log4js.getLogger();

logger.info('Hello world!');

// node.jsでタイムゾーンの変換処理にdate-fns-timezoneを利用する - Qiita: https://qiita.com/kazuhiro1982/items/b1235a893ee874d8ff65
// import
const { startOfDay, addDays } = require('date-fns');
const { convertToTimeZone } = require('date-fns-timezone');

// タイムゾーン定義
const timeZone = "Asia/Tokyo";

// 現在時刻(UTC)を取得
const targetDate = new Date();
// TimeZone付きDateに変換
const zonedTargetDate = convertToTimeZone(targetDate, { timeZone: timeZone });
// 文字列化
const d1 = zonedTargetDate.toISOString(); // => '2019-03-05T15:00:00.000Z'

logger.info(d1);
// 

var 

