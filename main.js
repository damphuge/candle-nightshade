//起動は node main.js

// Dateなどのやつ
let util = require('./utilities.js');
// 天気
//let Airi = require('./weatherRoidTypeA.js');

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
  //さいころ
    if (message.content === 'さいころ') {
        console.log("test");
        let channel = message.channel;
        let author = message.author.username;
        var num = Math.floor( Math.random() * 6 + 1 ) ;
        let reply_text = `${author}のさいころの出目は`+ num;

        // そのチェンネルにメッセージを送信する
        message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
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
  if (message.content.match(/^.{2,4}の天気$/)) {
    const date_request = util.getRelativeDate(message.content.replace(/の天気/, ''));
    console.log(date_request);
    let channel = message.channel;
    let author = message.author.username;
    // そのチェンネルにメッセージを送信する
 //   let promise = new Promise((resolve, reject)=> {
  //    let reply_text = Airi.getWeather(date_request);
  //    if(reply_text){ resolve(reply_text); }
 //     else { reject(); }
//    });
    
//    promise
//      .then((reply_text)=> { message.reply(reply_text); })
//      .catch(()=> { message.reply('長崎は今日も雨だった'); });
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
  if (message.content.includes("敗北者")) {
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
//       //タイマー
//   if (message.content.includes("@timer")) {
//     clearTimeout(id);//起動時に前回のidを消す・・・まて、ほかのやつも消える
//     var mystr =message.content;
//     var result = mystr.replace(/[^0-9]/g, '');
//     console.log(result);
//     message.reply("タイマースタート！"+result+"分");
//     var time= 60000 * result;
//     id = setTimeout(res, time);
//     function res(){
//       console.log("タイマーストップ");
//     message.reply("タイマーストップ！");

//     }
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
        message.reply("text",{files: [{ attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fokd.jpg?v=1567130070416", name: "okd.png" }]});
        return;
    }
   //アローラオーキド博士 
   if (message.content === 'アローラオーキド博士') {
        console.log("オーキド博士");
        let channel = message.channel;
        let author = message.author.username;
        // そのチェンネルにメッセージを送信する
        message.reply("ファッキュー・・・ぶち殺すぞ",{files: [{ attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fa_okd.jpg?v=1567130077289", name: "okd.png" }]});
        return;
    }
  
  
  var sai = require('./sai.js'); 
 

  
  var info;
    //メガガイア
  if (message.content.includes("@mega")) {
      console.log("メガガイア");
     　var mystr =message.content;
    　　var result = mystr.replace(/[^0-9]/g, '');
            
        let channel = message.channel;
        let author = message.author.username;
    
        // そのチェンネルにメッセージを送信する
          var url ="http://hall.gaia-jp.com/sp/mb/playdatas/sdetail?st=aom&rb=S20&mno=" + result;
         
         var image = "http://hall.gaia-jp.com/sp/gdrawmb.php?st=aom&dt=t&mno=" + result;
    
            ch.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36';
ch.fetch(url, { q: 'node.js'}, function (err, $, res) {
    // レスポンスヘッダを参照
// console.log(res.headers);

    // HTMLタイトルを表示
    //console.log($('title').text());
　　info = $('b').text();
    //console.log($('b').text());
  console.log(info);
 message.reply(info+"だハメ！くそ台ハメねぇ",{files: [{ attachment: image, name: "okd.png" }]});
});
        
        return;
    } 
      

  
 
  
  
  
});

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );