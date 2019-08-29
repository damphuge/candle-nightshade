

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



/*
  今日の日付を取得する。
  天気情報サイトのxmlファイル中の日付の書式に合わせる。
  - サイト: https://www.drk7.jp/weather/
  
  return: date (String)
  
  ref:
  - node.jsでタイムゾーンの変換処理にdate-fns-timezoneを利用する - Qiita
    - https://qiita.com/kazuhiro1982/items/b1235a893ee874d8ff65
  - JavaScriptでゼロパディングして桁をそろえる方法
    - https://so-zou.jp/web-app/tech/programming/javascript/grammar/data-type/string/zero-padding.htm
*/
var getToday = function(relative) {
  // import
  const { addDays } = require('date-fns');
  const { convertToTimeZone } = require('date-fns-timezone');
  // タイムゾーン定義
  const timeZone = "Asia/Tokyo";
  // 現在時刻(UTC)を取得
  const targetDate = new Date();
  // TimeZone付きDateに変換
  const zonedTargetDate = convertToTimeZone(targetDate, { timeZone: timeZone });
  
  
  // 年月日を取得
  const year = zonedTargetDate.getFullYear();
  const month = zonedTargetDate.getMonth() + 1;
  const day = zonedTargetDate.getDate();
  // 書式をYYYY/MM/DDに変換
  const date = year + '/' +
        ('00' + month).slice(-2) + '/' +
        ('00' + day).slice(-2);
  
  return date;
};