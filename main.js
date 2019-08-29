//起動は node main.js
//nodemon を入れると自動化できる（nodemon　node.jsで検索）
//uptime rebootは気にするな
//基本的に保存してから自動起動するけどたまにしない
//一度起動してからは5分後に絶対落ちる(それをuptaime rebootで無理やり起こしてる)
//おめシスはいいぞ
//おめシスはいいぞ
//おめシスはいいぞ
//おめシスはいいぞ
//おめシスはいいぞ

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

var tenki

const prefAomori = '02' // xmlファイルの番号
const areaTsugaru = 2   // xmlファイル内での地域番号
//天気
var request = require('request');
var parseString = require('xml2js').parseString;

var url = 'https://www.drk7.jp/weather/xml/02.xml';
 //ここがXMLパーサ
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        parseString(body, function (err, result) {
            var day = result.weatherforecast.pref[0].area[areaTsugaru].info[0]['$'].date + "\n";
            var weather = result.weatherforecast.pref[0].area[areaTsugaru].info[0].weather[0] + "\n";
            var detail = result.weatherforecast.pref[0].area[areaTsugaru].info[0].weather_detail[0] + "\n";
            var max = "最高気温は" + result.weatherforecast.pref[0].area[areaTsugaru].info[0].temperature[0].range[0]._ + "度ハメ\n";
            var min = "最低気温は" + result.weatherforecast.pref[0].area[areaTsugaru].info[0].temperature[0].range[1]._ + "度ですハメ";
 
            tenki = "ハメドリくんだハメ。青森の天気予報だハメ\n" + day + weather + detail + max + min;
 
            console.log(tenki);
 
        });
    } else {
        console.log(error + " : " + response);
    }
 
});



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
   if (message.content === '天気') {
        console.log("天気");
        let channel = message.channel;
        let author = message.author.username;
        // そのチェンネルにメッセージを送信する
        message.reply(tenki);
        return;
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

      //タイマー
  if (message.content.includes("@timer")) {
    var mystr =message.content;
    var result = mystr.replace(/[^0-9]/g, '');
    console.log(result);
    message.reply("タイマースタート！"+result+"分");
    var time= 60000 * result;
    setTimeout(res, time);
    function res(){
      console.log("タイマーストップ");
    message.reply("タイマーストップ！");

    }
  }
  
});

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );

