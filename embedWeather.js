var Discord = required('discord.js');
var util = required('./utilities.js');

let embedWeather = (function (message) {
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
  const args = message.content.slice(/*ここにプレフィックス*/).trim().split(/ +/g);
  weather.find({search: args[0], degreeType: 'C'}, function(err, result) {
  if (err) message.channel.send(err);
  if (result.length === 0) {
    message.reply('**場所を取得できませんでした**') 
    return; 
  }
  const embed = new Discord.MessageEmbed()
    .setDescription('**' + skytext + '**') 
    .setAuthor(`${current.date}の${current.observationpoint}の天気`) 
    .setThumbnail(current.imageUrl) 
    .setColor(Color) 
    .addField('温度',`${current.temperature}℃`, true)
    .addField('体感温度', `${current.feelslike}℃`, true)
    .addField('風',current.winddisplay, true)
    .addField('湿度', `${current.humidity}%`, true);
  message.channel.send(embed);
  });
const options = {
    url: "https://www.drk7.jp/weather/xml/" + pref + ".xml",
    method: 'POST',
    json: true,
  };
  const body = await Airi.asyncRequest(options);
  const weathers = await Airi.asyncParseString(body);
  const weather = await Airi.getWeather(weathers, date, area, pref);
  const ymd = (weather['$'].date).split('/');
  const singing = new Discord.MessageEmbed()
    .setDescription(`${weather.weather[0]}だハメ\n` +
                    `${'weather_detail' in weather ? weather.weather_detail[0]: ' '}`
    .setTitle(`青森市の${ymd[1]}月${ymd[2]}日のお天気ハメ～！`)
    .setThumbnail(weather.img)
    .setColor(7506394)
    .addField("最高気温", `${weather.temperature[0].range[0]._}度ハメ`, true)
    .addField("最高気温", `${weather.temperature[0].range[1]._}度ですハメ`, true);
  
  message.reply(singing)
    .catch(console.error);
  
  return;
});

module.exports.embedWeather = embedWeather;