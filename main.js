//起動は node main.js
require('dotenv').config();

// Dateなどのやつ
let util = require('./utilities.js');
// 天気
let Airi = require('./weatherRoidTypeA.js');


//DB接続情報-
const { Client } = require('pg')

const dbConfig = {
    user: process.env.ENV_USER,
    host: process.env.ENV_HOST,
    database: process.env.ENV_DB,
    password: process.env.ENV_PASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false
    }
};

// Response for Uptime Robot
const http = require('http');
http.createServer(function(request, response)
    {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Discord bot is active now \n');
    }).listen(process.env.PORT);


// Discord bot implements
const discord = require('discord.js');
const client = new discord.Client();
var ch = require('cheerio-httpcli');

//ここからBOTの反応
client.on('ready', message =>
    {
        client.user.setPresence({ game: { name: 'ぬきたし２' } });
        console.log('bot is ready!');
    });


client.on('message', message =>
    {
        // bot自身の発言は無視
        if (message.author.bot) return;

        //メンション
        if(message.isMemberMentioned(client.user))
        {
            message.reply( 'やりますねぇ！' );
            console.log("test");
            return;
        }

       //!word
       if(message.content.match(/^!word .*/)){
        let index   = message.content.indexOf(" ");
        
     	 // ４．基準文字列から後の文字列を切り出して表示 
	     let messe = message.content.slice(index + 1);
         message.reply(`処理中${messe}`);
        
         const client = new Client(dbConfig);

         client.connect()

         client.query(`SELECT message FROM messages WHERE word = '${messe}'`)
         .then(res => {
            message.reply(res);
            return;
          })
          .catch(err => {
            console.error(err);
            message.reply(`エラーしたわ。${err}`);
            return;
          })
          .finally( async()=> {
            client.end();
            });
    }
      const addwordOperation = '!addword';
      if((new RegExp(`^${addwordOperation}`)).test(message.content)) {
        console.log(`${addwordOperation}命令`);
        const matches = (new RegExp(`^${addwordOperation} ([^\\ ]+) (.+)$`))
          .exec(message.content);
        console.log(matches);
        if (matches === null) {
          console.log(`${addwordOperation} 命令の形式にマッチしませんでした`);
          return;
        }

        const keyWord = matches[1];
        const keyDescription = matches[2];

        const insertQuery =`INSERT INTO messages (word, message) VALUES ('${keyWord}', '${keyDescription}')`;
        console.log(`DB: ${insertQuery}`);

        const dbClient = new Client(dbConfig)

        dbClient.connect();
        dbClient
          .query(insertQuery)
          .then(res => {
            console.log(`Insert (${keyWord}: ${keyDescription})`);
            message.reply(`追加しました. \`!word ${keyWord}\` で試してみてくれ`);
          })
          .catch(err => {
            console.error(err);
            message.reply(`エラーしたわ。原因は知らん`);
          })
          .finally(() => dbClient.end());
        return;
      }

        //日本地図
        if (message.content === 'にほん') {
            console.log("にほん");
            let channel = message.channel;
            let author = message.author.username;
            // そのチェンネルにメッセージを送信する
            message.reply("text",{files: [{ attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fmap-japan-10210.png?v=1566197317736", name: "test.png" }]});
            return;
        }

        //お仕置き執行人津波両夢
        if (message.content === '差別' || message.content === '黒人' || message.content === '朝鮮' || message.content === '在日' || message.content === 'チョッパリ' || message.content === 'SS' || message.content === 'ナチ') {
            console.log("差別検知");
            let channel = message.channel;
            let author = message.author.username;
            // そのチェンネルにメッセージを送信する
            message.reply("差別検知!!津波両夢は差別を許しません!",{files: [{ attachment: "https://cdn.discordapp.com/attachments/768317965800046602/827823207553040414/88808193_p0_master1200.jpg", name: "津波両夢.png" }]});
            return;
        }

        //天気
        if (message.content.match(/^.*天気.*$/)) {
            let channel = message.channel;
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

        //メッセージの文字列による条件分岐
        if (message.content === 'タイマー') {

            console.log("time");
            var str = message.content;
            str.match(/([+-]?[0-9]+\.?[0-9]*)/g);
            //setTimeout(countup, 1000);

            let channel = message.channel;
            let author = message.author.username;
            // そのチェンネルにメッセージを送信する
            return;
        }

        //　敗北者という単語が含まれていたときの処理
        if (message.content.includes(":test:")) {
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
        }

        //usage
        if (message.content === '!usage') {
            let reply_text = 'さいころ, 天気, にほん, @timer, 敗北者, メンション, オーキド博士（アローラのすがたもあるぞい）';
            message.reply(reply_text)
                .then(message => console.log(`Sent message: ${reply_text}`))
                .catch(console.error);
        }
        //オーキド博士
        if (message.content === 'オーキド博士') {
            console.log("オーキド博士");
            let channel = message.channel;
            let author = message.author.username;
            // そのチェンネルにメッセージを送信する
            message.reply("text", { files: [
                {
                    attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fokd.jpg?v=1567130070416",
                    name: "okd.png"
                }
            ]});
            return;
        }


        //さいころv2
        var sai = require('./sai.js');
        if (message.content === 'さいころ') {
            console.log("test");
            sai.test(message);
            return;
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
      //きたがわ
        var kitagawa = require('./kitagawa.js');
        if (message.content.includes("@kita")) {
            console.log("きたがわ");
            kitagawa.kitagawa_func(message,ch);
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
