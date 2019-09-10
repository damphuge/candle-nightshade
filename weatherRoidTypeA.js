let request = require('request');
let parseString = require('xml2js').parseString;
const discord = require('discord.js');

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
        console.log("asyncRequest: resolve");
        resolve(body);
      }
      else {
        console.log("asyncRequest: reject");
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
        console.log("asyncParseString: resolve");
        resolve(result);
      }
      else {
        console.log("asyncParseString: reject");
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
let getWeather = (function(weathers, date, area, pref) {
  return new Promise(function (resolve, reject) {
    const tmp = weathers.weatherforecast.pref;
    // tmp -> [ {id: 1}, {name: 'me'} ]
    // result -> {id: 1, name:'me'}
    const result = tmp.reduce((l,r) => Object.assign(l, r), {});
    for (let day=0; day<6; day++) {
      if (result.area[area].info[day]['$'].date === date) {
        // resolveで日付一致した部分を返り値として渡している（はず）
        console.log("getWeather: " + pref + area + day );
        console.log(result.area[area].info[day]);
        resolve(result.area[area].info[day]);
      }
    }
  });
});

/**
 * ハメドリくんのテキストを生成するハメ。
 * 
 * @param json weather お天気を受信するハメ！
 * @return String singing ハメドリくんのさえずりハメ！パコパコハメ～！
 */
let povBird = (function (weather) {
  return new Promise(function (resolve, reject) {
    var singing = "ハメドリくんだハメ。青森の天気予報だハメ\n";
    let day = weather['$'].date + "\n";
    console.log(day);
    let sky = weather.weather[0] + "\n";
    console.log(sky);
    let detail = ('weather_detail' in weather ? weather.weather_detail[0]: ' ') + "\n";
    let max = "最高気温は" + weather.temperature[0].range[0]._ + "度ハメ\n";
    let min = "最低気温は" + weather.temperature[0].range[1]._ + "度ですハメ";
    singing += day + sky + detail+ max + min;
       
    
    if(day === undefined){
      console.log("reject");
      reject();
    }
    else { 
      console.log(singing);
      resolve(singing); }
  });
});

let povBirdEmbed = (function (weather) {
  return new Promise(function (resolve, reject) {
    // Discord.jsでembed (埋め込みメッセージ) を扱う - Qiita:
    // > https://qiita.com/nedew/items/4e0c20c1a89e983a6992
    // weather-jsを使ってDiscordに天気を送る - Qiita: 
    // > https://qiita.com/rqiuyong1/items/f51a7f5cc43372841f96
    const ymd = (weather['$'].date).split('/');
    const singing = new Discord.MessageEmbed()
      .setDescription(`${weather.weather[0]}だハメ\n` +
                       `${'weather_detail' in weather ? weather.weather_detail[0]: ' '}`)
      .setTitle(`青森市の${ymd[1]}月${ymd[2]}日のお天気ハメ～！`)
      .setThumbnail(weather.img)
      .setColor(7506394)
      .addField("最高気温", `${weather.temperature[0].range[0]._}度ハメ`, true)
      .addField("最高気温", `${weather.temperature[0].range[1]._}度ですハメ`, true);   
    
    if(day === undefined){
      console.log("reject");
      reject();
    }
    else { 
      console.log(singing);
      resolve(singing); }
  });
});

let TypeA = (async function(date, area=2, pref='02') {
  const options = {
    url: "https://www.drk7.jp/weather/xml/" + pref + ".xml",
    method: 'POST',
    json: true,
  };
  process.on('unhandledRejection', console.dir);
  const body = await asyncRequest(options);
  const weathers = await asyncParseString(body);
  const weather = await getWeather(weathers, date, area, pref);
  const singing = await povBird(weather);
  return singing;
});

let TypeB = (async function(date, area=2, pref='02') {
  const options = {
    url: "https://www.drk7.jp/weather/xml/" + pref + ".xml",
    method: 'POST',
    json: true,
  };
  process.on('unhandledRejection', console.dir);
  const body = await asyncRequest(options);
  const weathers = await asyncParseString(body);
  const weather = await getWeather(weathers, date, area, pref);
  return weather;
});

// exports
module.exports = {
  TypeA: TypeA,
  TypeB: TypeB
};