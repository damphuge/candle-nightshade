var Discord = required('discord.js');
var util = required('utilities.js');

let embedWeathe = (function (message) {
  // 日付解析
  var date_request;
  if (message.content.match(/^.{2,4}の天気$/)) {
    date_request = util.getRelativeDate(message.content.replace(/の天気/, ''));
  }
  else if (message.content.match(/^天気$/)) {
    date_request = util.getRelativeDate('今日');
  }
  else if (message.content.match(/^天気の子$/)) {
    const reply_text = "明日も晴れるよ！！！！";
    message.reply(reply_text);
    return;
  }

  const options = {
    url: "https://www.drk7.jp/weather/xml/" + pref + ".xml",
    method: 'POST',
    json: true,
  };
  const body = await asyncRequest(options);
  const weathers = await asyncParseString(body);
  const weather = await getWeather(weathers, date, area, pref);
  const ymd = (weather['$'].date).split('/');
  const singing = new Discord.MessageEmbed()
    .setDescription(`${weather.weather[0]}だハメ\n` +
                    `${'weather_detail' in weather ? weather.weather_detail[0]: ' '}`
    .setTitle(`青森市の${ymd[1]}月${ymd[2]}日のお天気ハメ～！`)
    .setThumbnail(weather.img)
    .setColor(7506394)
    .addField("最高気温", `${weather.temperature[0].range[0]._}度ハメ`, true)
    .addField("最高気温", `${weather.temperature[0].range[1]._}度ですハメ`, true);
  
  message
  .reply(singing)
    .catch(console.error);
  
  return;
});