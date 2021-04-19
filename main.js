const fs = require('fs');

//起動は node main.js
require('dotenv').config();

const { DBConfig, dbClient } = require('./db');
const { prefix } = require('./config');
const { commandUsage, moduleReader } = require('./util');

// Response for Uptime Robot
const http = require('http');
http.createServer(function(request, response)
  {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Discord bot is active now \n');
  }).listen(process.env.PORT || 8080);

// Discord bot implements
const discord = require('discord.js');
const client = new discord.Client();
// var ch = require('cheerio-httpcli');

// Module reading
client.commands = moduleReader('./commands');
client.sensors = moduleReader('./sensors');

// ヘルプコマンド用のメッセージ作成
const help = new discord.MessageEmbed()
  .addFields(
    client.commands.map(command => {
      return {name: command.name, value: command.description, inline: true};
    })
  )
  .addField('\u200B', '\u200B', false /* 空白区切り */)
  .addFields(
    client.sensors.map(sensor => {
      return {name: sensor.name, value: sensor.description || `\`!help ${sensor.name}\``, inline: true};
    })
  );

//ここからBOTの反応
client.on('ready', message =>
  {
    client.user.setPresence({ game: { name: 'ぬきたし２' } });
    console.log('bot is ready!');
  });

client.on('message', async message =>
  {
    // bot自身の発言は無視
    if (message.author.bot) return;

    //メンション
    if(
      !message.mentions.everyone &&
      message.mentions.has(client.user.id) &&
      /^<@!?(?:\d+)>$/.test(message.content)
    )
    {
      message.reply( 'やりますねぇ！' );
      console.log("test");
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // HELP
    if (commandName === 'help') {
      if (args.length) {
        const cmdName = args.shift()
        const cmd = client.commands.get(cmdName) ?? client.sensors.get(cmdName);
        if (!cmd) {
          return message.reply(help);
        }
        return message.reply(commandUsage(cmd), { code: true });
      }
      else {
        return message.reply(help);
      }
    }

    // COMMANDS
    const command = client.commands.get(commandName);
    if (command) {
      if (command.args && !args.length) {
        return message.reply(commandUsage(command), { code: true });
      }

      try {
        console.log('コマンド実行: ' + command.name)
        command.execute(message, args);
      } catch (err) {
        console.error(err);
      }

      return;
    }

    let sensor = null;
    for (const sensor of client.sensors.values()) {
      console.log(sensor);
      let index = sensor.words.indexOf(message.content);
      if (index !== -1) {
        console.log('センサー感知: ' + sensor.name)
        try{
          sensor.execute(message, sensor.words[index]);
        } catch (err) {
          console.error(err);
        }
      }
    }

    //天気
    if (message.content.match(/^.*天気.*$/)) {
      let Airi = require('./lib/weatherRoidTypeA.js');
      // Dateなどのやつ
      let { getRelativeDate } = require('./lib/utilities.js');

      var date_request;
      if (message.content.match(/^.{2,4}の天気$/)) {
        date_request = util.getRelativeDate(message.content.replace(/の天気/, ''));
        console.log(date_request);
      }
      else if (message.content.match(/^天気$/)) {
        date_request = util.getRelativeDate('今日');
        console.log(date_request);
      }
      else if (message.content.match(/^天気の子$/)) {
        const reply_text = "明日も晴れるよ！！！！";
        message.reply(reply_text);
        return;
      }
      // そのチェンネルにメッセージを送信する
      let promise = (async function(date) {
        const reply_text = Airi.TypeA(date);
        if(reply_text){ return reply_text; }
      });

      promise(date_request)
        .then((reply_text)=> { message.reply(reply_text); })
        .catch(()=> { message.reply('長崎は今日も雨だった'); });
    }

    //　敗北者という単語が含まれていたときの処理
    if (message.content.includes(":test:")) {
      if (message.mentions.has(client.user.id) && message.member.voiceChannel) {
        /* ボイスチャンネルにいる人がbotにメンションをしたときの処理 */
        message.member.voiceChannel
          .join()
          .then(connection => {
            const fileNames = ["haibokusya.m4a", "torikeseyoimanokotoba.m4a"];
            // 複数の音声データのうちいずれかをランダムで選ぶ
            const fileName =
              fileNames[Math.floor(Math.random() * fileNames.length)];

            // 再生 再生終了時にボイスチャンネルから切断
            const dispatcher = connection.playFile(fileName);
            dispatcher.on("end", () => connection.disconnect());
          })
          .catch(console.error);
      } else {
        /* 敗北者という単語が含まれているが、
                   メンションでなかったり発言者がボイスチャンネルにいないときの処理 */
        const texts = [
          "ハァ...ハァ...敗北者...?",
          "取り消せよ...!!今の言葉...!!",
        ];

        // メンションする文字列をランダムで選択
        const replyText = texts[Math.floor(Math.random() * texts.length)];
        message.reply(replyText).catch(console.error);
      }
    }

    //メガガイア
    var mega = require('./lib/mega_osmosis.js');
    const megaList = ['@mega', 'mega@'];
    listIsMega = megaList.map(x => message.content.includes(x))
    if(listIsMega.some(x=>x)){
      console.log("メガガイア");
      mega.mega_func(message,ch);
      return;
    }
  });

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
  console.log('please set ENV: DISCORD_BOT_TOKEN');
  process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );
