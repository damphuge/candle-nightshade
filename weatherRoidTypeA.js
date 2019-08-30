let tenki = function(pref, area, date){
  let request = require('request');
  let parseString = require('xml2js').parseString;

  let url = 'https://www.drk7.jp/weather/xml/' + prefAomori + '.xml';
  //ここがXMLパーサ
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseString(body, function (err, result) {
      // [現時点では]今日の日付に一致する天気を取得。
        for(let i=0; i < 6; i++) {
          if(result.weatherforecast.pref[0].area[areaTsugaru].info[i]['$'].date === today){
            var day = result.weatherforecast.pref[0].area[areaTsugaru].info[i]['$'].date + "\n";
            var weather = result.weatherforecast.pref[0].area[areaTsugaru].info[i].weather[0] + "\n";
            var detail = result.weatherforecast.pref[0].area[areaTsugaru].info[i].weather_detail[0] + "\n";
            var max = "最高気温は" + result.weatherforecast.pref[0].area[areaTsugaru].info[i].temperature[0].range[0]._ + "度ハメ\n";
            var min = "最低気温は" + result.weatherforecast.pref[0].area[areaTsugaru].info[i].temperature[0].range[1]._ + "度ですハメ";
          }
        }
        tenki = "ハメドリくんだハメ。青森の天気予報だハメ\n" + day + weather + detail + max + min;
        console.log(tenki);
        });
    } else {
      console.log(error + " : " + response);
    }
  });
};

//天気
const prefAomori = '02'; // xmlファイルの番号
const areaTsugaru = 2;   // xmlファイル内での地域番号

