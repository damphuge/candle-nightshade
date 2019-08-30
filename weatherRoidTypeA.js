/*
  天気を教える関数
  
  @param String $date 日付(YYYY/MM/DD)
  @param Integer $area 地域(初期値は青森県津軽を想定), xmlファイル内の地域id
  @param String $pref 都道府県(初期値は青森県), xmlファイル名の番号
*/
let getWeather = function(date, area=2, pref='02'){
  let request = require('request');
  let parseString = require('xml2js').parseString;
  
  //今は青森だけど[TODO]
  let tenki = "ハメドリくんだハメ。青森の天気予報だハメ\n"
  let url = 'https://www.drk7.jp/weather/xml/' + pref + '.xml';
  //ここがXMLパーサ
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseString(body, function (err, result) {
      // [現時点では]今日の日付に一致する天気を取得。
        for(let i=0; i < 6; i++) {
          if(result.weatherforecast.pref[0].area[area].info[i]['$'].date === date){
            var day = result.weatherforecast.pref[0].area[area].info[i]['$'].date + "\n";
            var weather = result.weatherforecast.pref[0].area[area].info[i].weather[0] + "\n";
            var detail = result.weatherforecast.pref[0].area[area].info[i].weather_detail[0] + "\n";
            var max = "最高気温は" + result.weatherforecast.pref[0].area[area].info[i].temperature[0].range[0]._ + "度ハメ\n";
            var min = "最低気温は" + result.weatherforecast.pref[0].area[area].info[i].temperature[0].range[1]._ + "度ですハメ";
          }
        }
        tenki += day + weather + detail + max + min;
        });
    } else {
      console.log(error + " : " + response);
    }
  });
  return tenki;
};

// exports
module.exports = {
  getWeather: getWeather
};