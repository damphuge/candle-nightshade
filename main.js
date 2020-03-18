//起動は node main.js

// Dateなどのやつ
let util = require('./utilities.js');
// 天気
let Airi = require('./weatherRoidTypeA.js');

// Response for Uptime Robot
const http = require('http');
http.createServer(function(request, response)
    {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Discord bot is active now \n');
    }).listen(3000);

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

        //日本地図
        if (message.content === 'にほん') {
            console.log("にほん");
            let channel = message.channel;
            let author = message.author.username;
            // そのチェンネルにメッセージを送信する
            message.reply("text",{files: [{ attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fmap-japan-10210.png?v=1566197317736", name: "test.png" }]});
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

        //   var id;//idを処理の外に置く
        //   //タイマー
        //   if (message.content.includes("@timer")) {
        //   clearTimeout(id);//起動時に前回のidを消す・・・まて、ほかのやつも消える
        //   var mystr =message.content;
        //   var result = mystr.replace(/[^0-9]/g, '');
        //   console.log(result);
        //   message.reply("タイマースタート！"+result+"分");
        //   var time= 60000 * result;
        //   id = setTimeout(res, time);
        //   function res(){
        //   console.log("タイマーストップ");
        //   message.reply("タイマーストップ！");

        //   }
        //   }

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
        var mega = require('./mega.js');
        if (message.content.includes("@mega")) {
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
