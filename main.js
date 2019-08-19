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

client.on('ready', message =>
{
  client.user.setPresence({ game: { name: '小比類巻の彼女' } });  
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
  
      //
  if (message.content.includes("タイマー")) {

  }
  
  
});

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );