/*
  天気を教える関数
  
  @param String $date 日付(YYYY/MM/DD)
  @param Integer $area 地域(初期値は青森県津軽を想定), xmlファイル内の地域id
  @param String $pref 都道府県(初期値は青森県), xmlファイル名の番号
*/
let getWeather = function(date, area=2, pref='02'){
  const p = new Promise((resolve, reject) => {
    let request = require('request');
    let parseString = require('xml2js').parseString;
    let url = 'https://www.drk7.jp/weather/xml/' + pref + '.xml';
    //ここがXMLパーサ
    request (url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        parseString(body, function (err, result) {
        // 日付に一致する天気を取得。
          for(let i=0; i < 6; i++) {
            if(result.weatherforecast.pref[0].area[area].info[i]['$'].date === date){
              console.log(date);
              var day = result.weatherforecast.pref[0].area[area].info[i]['$'].date + "\n";
              var weather = result.weatherforecast.pref[0].area[area].info[i].weather[0] + "\n";
              var detail = result.weatherforecast.pref[0].area[area].info[i].weather_detail[0] + "\n";
              var max = "最高気温は" + result.weatherforecast.pref[0].area[area].info[i].temperature[0].range[0]._ + "度ハメ\n";
              var min = "最低気温は" + result.weatherforecast.pref[0].area[area].info[i].temperature[0].range[1]._ + "度ですハメ";

              //今は青森だけど[TODO]
              var tenki = "ハメドリくんだハメ。青森の天気予報だハメ\n" + day + weather + detail + max + min;
            }
          }
          resolve(tenki);
        });
      } else {
        console.log(error + " : " + response);
      }
    });
  });
  
  return p;
};

// exports
module.exports = {
  getWeather: getWeather
};

const promise = new Promise((resolve, reject) => resolve()); // Promiseを作成し、終了する
promise.then(() => console.log('done!')); // Promiseが終了したら「done!」と表示する