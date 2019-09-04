let request = require('request');
let parseString = require('xml2js').parseString;

/**
 * Asyncanize request()
 * 
 * > nodejs requestモジュールをpromise化してasync/awaitで呼び出し
 * > https://qiita.com/murase/items/908cf31b6776448a5b1d
 * 
 * @param {*} options URL and method
 * @return Promise body
 */
let asyncRequest = (function (options) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if(!error && response.statusCode == 200) {
        resolve(body);
      }
      else {
        reject(error);
      }
    });
  });
});

/**
 * Asyncanize parseString()
 * 
 * > JavaScriptでasync/awaitに対応していない関数を対応させる
 * > Living Absurd World
 * > https://blog.hmatoba.net/Article/168
 * 
 * @param {*} body 
 * @return Promise Array json
 */
let asyncParseString = (function (body) {
  return new Promise(function (resolve, reject) {
    // ここはわからん。写経した
    const options = {
      trim: true,
      explicitArray: false
    };
    parseString(body, function (error, result) {
      if(!error) {
        resolve(result);
      }
      else {
        reject(error);
      }
    });
  });
});

/** 
 * Get weather from json from xml (https://www.drk7.jp/weather/)
 * 
 * @param json weathers 1-week weather forecast for 1 pref.
 * @param Date date YYYY/MM/DD
 * @param Integer area 
 * @param String pref 01-47
 * @return json weather a day weather forecast for 1 region.
 */
async function getWeather(weathers, date, area, pref) {
  for (let day=0; day<6; day++) {
    if (weathers.weatherforecast.pref[pref].area[area].info[day]['$'].date === date) {
      // resolveで日付一致した部分を返り値として渡している（はず）
      return weathers.weatherforecast.pref[pref].area[area].info[day];
  }
}

/**
 * ハメドリくんのテキストを生成するハメ。
 * 
 * @param json weather お天気を受信するハメ！
 * @return String singing ハメドリくんのさえずりハメ！パコパコハメ～！
 */
async function povBird(weather) {
  var singing = "ハメドリくんだハメ。青森の天気予報だハメ\n";
  let day = result['$'].date + "\n";
  let sky = result.weather[0] + "\n";
  let detail = result.weather_detail[0] + "\n";
  let max = "最高気温は" + result.temperature[0].range[0]._ + "度ハメ\n";
  let min = "最低気温は" + result.temperature[0].range[1]._ + "度ですハメ";
  singing += day + sky + detail + max + min;

  console.log('0' + (typeof singing === 'undefined'));
  console.log(singing);

  return singing;
}

async function TypeA(date, area=2, pref='02') {
  const body = await asyncRequest(options);
  const weathers = await asyncParseString(body);
  const weather = await getWeather(weathers, date, area, pref);
  const singing = await povBird(weather);
  return singing;
};

let main = function(date, area=2, pref='02') {
  return TypeA(date, area, pref);
}
/*
function main(){
   console.log('RUN' + getWeather('2019/09/01'));
}

main();

*/
// exports
module.exports = {
  main: main
};