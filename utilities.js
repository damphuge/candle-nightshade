'use strict'
/*
  logger
  ref:
  - log4jsの覚え書き - log4.jsを使ってみた - - Qiita
    - https://qiita.com/_daisuke/items/865cf929a403cc9eec53
*/
/* 結構実装が面倒（徹底が面倒い）のでパス
const log4js = require('log4js')
log4js.configure({
  appenders: {
    logFile: {
      type:'dateFile',
      filename:'./logs/system.log',
    },
    console: {
      type:'stdout'
    }
  },
  categories: {
    default: {appenders: ['console'], level: 'info'},
    develop: {appenders: ['console'], level: 'debug'},
    master: {appenders: ['logFile'], level: 'warn'}
  }
})
*/

/*
  相対日付を取得する。
  天気情報サイトのxmlファイル中の日付の書式[YYYY/MM/DD]に合わせる。
  - サイト: https://www.drk7.jp/weather/
  
  ref:
  - node.jsでタイムゾーンの変換処理にdate-fns-timezoneを利用する - Qiita
    - https://qiita.com/kazuhiro1982/items/b1235a893ee874d8ff65
  - JavaScriptでゼロパディングして桁をそろえる方法
    - https://so-zou.jp/web-app/tech/programming/javascript/grammar/data-type/string/zero-padding.htm

  @param String $relativeEx 今日、明日、明後日などの相対日付表現
  @return String $date YYYY/MM/DD形式の日付
*/
let getRelativeDate = function(relativeEx) {
  // import
  const { addDays } = require('date-fns');
  const { convertToTimeZone } = require('date-fns-timezone');
  
  // 相対日付を定義
  const relativeDate = {'今日': 0, '明日': 1, '明後日': 2, '明々後日': 3};
  relativeDate["本日"] = 0;
  relativeDate["明明後日"] = 3;
  
  // タイムゾーン定義
  const timeZone = "Asia/Tokyo";
  // 現在時刻(UTC)を取得
  const currentDate = new Date();
  // TimeZone付きDateに変換
  const zonedCurrentDate = convertToTimeZone(currentDate, { timeZone: timeZone });
  let zonedTargetDate = zonedCurrentDate;
  // 相対日付を取得
  if(!relativeEx){ relativeEx = '今日'}
  if(relativeEx in relativeDate){
    zonedTargetDate = addDays(zonedCurrentDate, relativeDate[relativeEx]);
  } else {
    throw new Error(`${relativeEx} is not supported by getRelativeDate.`);
  }
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

// exports
module.exports = {
  getRelativeDate: getRelativeDate
};