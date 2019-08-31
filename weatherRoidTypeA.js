/*
  ハメドリくんのテキストを生成するハメ。

  @param jPromise $p 天気予報情報ハメ。マスかいてたくさん出てきたハメよ。
  @return String $tenki 天気予報ハメ。マンコかっぽじってよく聞くハメ。
*/
let povBird = function(p) {
  p.then((result)=> {
    let day = result['$'].date + "\n";
    let weather = result.weather[0] + "\n";
    let detail = result.weather_detail[0] + "\n";
    let max = "最高気温は" + result.temperature[0].range[0]._ + "度ハメ\n";
    let min = "最低気温は" + result.temperature[0].range[1]._ + "度ですハメ";
    var tenki = "ハメドリくんだハメ。青森の天気予報だハメ\n";
    tenki += day + weather + detail + max + min;      
    // DEBUG
    console.log(tenki);
    return tenki;
  });
};

/*
  天気予報を教える関数
  
  @param String $date 日付(YYYY/MM/DD)
  @param Integer $area 地域(初期値は青森県津軽を想定), xmlファイル内の地域id
  @param String $pref 都道府県(初期値は青森県), xmlファイル名の番号
  @return String povBird(asyncParseString) SCP-8585RECとの交信履歴
*/
let getWeather = function(date, area=2, pref='02'){
  let request = require('request');
  let parseString = require('xml2js').parseString;
  let url = 'https://www.drk7.jp/weather/xml/' + pref + '.xml';
  //ここがXMLパーサ
  request (url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // JavaScriptでasync/awaitに対応していない関数を対応させる
      // -- Living Absurd World
      // https://blog.hmatoba.net/Article/168
      let asyncParseString = (function(body, date, area, pref) {
        return new Promise(function(resolve, reject){
          // ここはわからん。写経した
          const options = {
            trim: true,
            explicitArray: false
          };
          parseString(body, function (err, result) {
            // 日付に一致する天気を取得。
            for(let i=0; i < 6; i++) {
              if(result.weatherforecast.pref[0].area[area].info[i]['$'].date === date){
                // resolveで日付一致した部分を返り値として渡している（はず）
                resolve(result.weatherforecast.pref[0].area[area].info[i]);
              } // if
            } // for
          }); // parseString()
        }); // Promise function()
      })(body, date, area, pref); // asyncParseString() 即時関数にして実行
      // ハメドリくんに解析結果を渡している（はず）
      return povBird(asyncParseString);
    } else {
      console.log(error + " : " + response);
    }
  }); // request()
};


function main(){
   console.log('RUN' + getWeather('2019/09/01'));
}

main();

// exports
module.exports = {
  getWeather: getWeather
};
