//起動は node main.js
require('dotenv').config();

// Dateなどのやつ
let util = require('./utilities.js');
// 天気
let Airi = require('./weatherRoidTypeA.js');


//DB接続情報-
const { Client } = require('pg')

const dbConfig = {
  user: process.env.ENV_USER || 'undefined ENV_USER',
  host: process.env.ENV_HOST || 'undefined ENV_HOST',
  database: process.env.ENV_DB || 'undefined ENV_DB',
  password: process.env.ENV_PASSWORD || 'undefined ENV_PASSWORD',
  port: 5432,
  ssl: {
    sslmode: 'require',
    rejectUnauthorized: false
  }
};

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
var ch = require('cheerio-httpcli');

const prefix = process.env.COMMAND_PREFIX || '!';

/**
 * Cog.
 */
class Cog {
  /**
   * @param {string} command
   * @param {function} callback function(message: discord.Message)
   * @param {string} name
   * @param {string} description
   * @param {string} parameter
   */
  constructor(command, callback, name='', description='', parameter='') {
    this.validate(command, callback);

    this.command = command;
    this.regex = new RegExp(`${prefix}${command}`);
    this.callback = callback;
    this.name = name;
    this.description = description;
    this.parameter = parameter;
  }

  validate(command, callback) {
    if (!command) {
      throw "command string is not defined"
    }
    if (typeof command != "string") {
      throw `expected type 'string', found '${typeof command}'`
    }
    if (!callback) {
      throw "callback function is not defined"
    }
    if (typeof callback != "function") {
      throw `expected type 'function', found '${typeof callback}'`
    }
  }
  get usage() {
    return `\`${prefix}${this.command}` + (this.parameter ? ` ${this.parameter}\`` : '`');
  }
}

/**
 * Sensor.
 */
class Sensor {
  /**
   * @param {string} name
   * @param {string[]} words
   * @param {function} callback function(message: discord.Message)
   * @param {string} description
   */
  constructor(name, words, callback, description='') {
    this.validate(name, words, callback);

    this.name = name;
    this.words = words;
    this.callback = callback;
    this.description = description;
  }

  validate(name, words, callback) {
    if (!name) {
      throw "name streing is not defined"
    }
    if (typeof name != "string") {
      throw `expected type 'string', found '${typeof name}'`
    }
    if (!words) {
      throw "command string[] is not defined"
    }
    if (!Array.isArray(words)) {
      throw `expected type 'string[]', found '${typeof words}'`
    }
    if (typeof words[0] != "string") {
      throw `expected type 'string[]', found '${typeof words[0]}[]'`
    }
    if (!callback) {
      throw "callback function is not defined"
    }
    if (typeof callback != "function") {
      throw `expected type 'function', found '${typeof callback}'`
    }
  }
}

const cogs = [];
function addCog(command, callback, name='', description='', parameter='') {
  cogs.push(new Cog(command, callback, name, description, parameter))
}

const sensors = [];
function addSensor(words, callback, name='', description='') {
  sensors.push(new Sensor(words, callback, name, description))
}

addCog("word", (message) => {
  let index   = message.content.indexOf(" ");

  // ４．基準文字列から後の文字列を切り出して表示 
  let messe = message.content.slice(index + 1);        
  const dbClient = new Client(dbConfig);

  dbClient.connect()

  dbClient
    .query(`SELECT message FROM messages WHERE word = '${messe}' LIMIT 1`)
    .then(res => {
      if(res.rows.length == 0) {
        message.reply(`そんな言葉は知らない. You should use \`!addword ${messe} <description>\`.`);
        return;
      }
      message.channel.send(res.rows[0].message);
    })
    .catch(err => {
      console.error(err);
      message.reply(`エラーしたわ。`);
      return;
    })
    .finally(()=> {
      dbClient.end();
    });
});

addCog("addword", (message) => {
  const separations = `\\s\\r\\n`;
  const matches = (new RegExp(`^${prefix}addword[${separations}]+([^${separations}]+)[${separations}]+([^]+)`))
    .exec(message.content);
  console.log(matches);
  if (matches === null) {
    console.error(`命令の形式にマッチしませんでした`);
    return;
  }

  const keyWord = matches[1];
  const keyDescription = matches[2];

  const constraintName = 'messages_word_key';
  const insertQuery = `INSERT INTO messages (word, message) VALUES ('${keyWord}', '${keyDescription}')
          ON CONFLICT ON CONSTRAINT ${constraintName}
          DO UPDATE SET message='${keyDescription}'`;
  console.log(`SQL: ${insertQuery}`);

  const dbClient = new Client(dbConfig)

  dbClient.connect();
  dbClient
    .query(insertQuery)
    .then(res => {
      console.log(`Insert (${keyWord}: ${keyDescription})`);
      message.reply(`追加しました. \`${prefix}word ${keyWord}\` で試してみてくれ`);
    })
    .catch(err => {
      console.error(err);
      message.reply(`エラーしたわ。原因は知らん`);
    })
    .finally(() => dbClient.end());
},
  null,
  '※死ぬほど大きいAAには対応してないらしい。詳しくは俺もわからん',
  '登録したいキーワード 登録したい説明文（改行可）'
);

addSensor("日本地図",
  ["にほん"],
  (message) => {
    // そのチェンネルにメッセージを送信する
    message.reply("",{files: [{ attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fmap-japan-10210.png?v=1566197317736", name: "test.png" }]});
  });

addSensor("お仕置き執行人津波両夢",
  ["差別", "黒人", "朝鮮", "在日", "チョッパリ", "SS", "ナチ"],
  (message) => {
    console.log("差別検知");
    // そのチェンネルにメッセージを送信する
    message.reply("差別検知!!津波両夢は差別を許しません!",{files: [{ attachment: "https://cdn.discordapp.com/attachments/768317965800046602/827823207553040414/88808193_p0_master1200.jpg", name: "津波両夢.png" }]});
  });

addSensor("タイマー",
  ["タイマー"],
  (message) => {
    console.log("time");
    var str = message.content;
    str.match(/([+-]?[0-9]+\.?[0-9]*)/g);
    //setTimeout(countup, 1000);

    let author = message.author.username;
    // そのチェンネルにメッセージを送信する
  });
  
addSensor("敗北者",
  ["敗北者"],
  (message) => {
    if (message.isMemberMentioned(client.user) && message.member.voiceChannel) {
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
  });

addSensor("オーキド博士",
  ["オーキド博士"],
  (message) => {
    let author = message.author.username;
    // そのチェンネルにメッセージを送信する
    message.reply("text", { files: [
      {
        attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fokd.jpg?v=1567130070416",
        name: "okd.png"
      }
    ]});
  });

addSensor("さいころ",
  ["さいころ", "サイコロ"],
  (message) => {
    var sai = require('./sai.js');
    sai.test(message);
  });

addCog("kita", (message) => {
  var kitagawa = require('./kitagawa.js');
  kitagawa.kitagawa_func(message,ch);
},
  "きたがわ");

//ここからBOTの反応
client.on('ready', message => {
    client.user.setPresence({ game: { name: 'ぬきたし２' } });
    console.log('bot is ready!');
});

client.on('message', message =>
  {
    // bot自身の発言は無視
    if (message.author.bot) return;

    if (/!help/.test(message.content)) {
      const helpEmbedMessage = new discord.RichEmbed()
      cogs
        .forEach(cog => {
          console.log(cog.command, cog.usage);
          helpEmbedMessage.addField(cog.name || cog.command, cog.usage)
        });
      sensors
        .forEach(sensor => helpEmbedMessage.addField(sensor.name, sensor.words.join(', ')));

      helpEmbedMessage
        .addField("天気の子", "今日, 明日, 明後日, 明々後日の天気")
        .addField("メガガイア", "1234@mega, mega@1234（1234は機械番号）")

      message.channel.send(helpEmbedMessage);
    }

    cogs.forEach(cog => {
      if (cog.regex.test(message.content)) {
        console.log(`START Cog: ${cog.command}`)
        try {
          cog.callback(message)
        } catch (err) {
          console.error(err);
          if (cog.parameter) {
            message.reply(cog.usage);
          }
        }
        console.log(`END   Cog: ${cog.command}`)
      }
    });

    let sensorResponsed = false;
    sensors.forEach(sensor => {
      if (sensorResponsed) {
        return;
      }
      const content = message.content.replace(new RegExp(`<@!${client.user.id}>\\s+`), '')
      if (sensor.words.includes(content)) {
        console.log(`START Sensor: ${sensor.name}`)
        try {
          sensor.callback(message);
        } catch (err) {
          console.error(err);
        } finally {
          sensorResponsed = true;
          console.log(`END   Sensor: ${sensor.name}`)
        }
      }
    });
    if (sensorResponsed) {
      return;
    }

    //メンション
    if(message.isMemberMentioned(client.user))
    {
      message.reply( 'やりますねぇ！' );
      console.log("test");
      return;
    }

    //天気
    if (message.content.match(/^.*天気.*$/)) {
      let author = message.author.username;
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

    //メガガイア
    var mega = require('./mega_osmosis.js');
    const megaList = ['@mega', 'mega@'];
    listIsMega = megaList.map(x => message.content.includes(x))
    if(listIsMega.some(x=>x)){
      console.log("メガガイア");
      mega.mega_func(message,ch);
      return;
    }

    //GB
    var gb = require('./gb.js');
    if (message.content.includes("@kita")) {
      console.log("ジェネラルバトル");
      gb.gb_func(message,ch);
      return;
    }

  });

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
  console.log('please set ENV: DISCORD_BOT_TOKEN');
  process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );
