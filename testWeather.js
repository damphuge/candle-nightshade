let Airi = require('./weatherRoidTypeA.js');
var discord = require('discord.js');

const result = Airi.TypeB("2019/09/11");
console.log(result);
const ymd = toString(result.date).split('/');
const singing = new Discord.MessageEmbed()
  .setDescription(`${result.weather[0]}だハメ\n` +
                   `${'weather_detail' in result ? result.weather_detail[0]: ' '}`)
  .setTitle(`青森市の${ymd[1]}月${ymd[2]}日のお天気ハメ～！`)
  .setThumbnail(result.img)
  .setColor(7506394)
  .addField("最高気温", `${result.temperature[0].range[0]._}度ハメ`, true)
  .addField("最高気温", `${result.temperature[0].range[1]._}度ですハメ`, true);   

console.log(singing);