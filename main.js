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
  //メンション
	if(message.isMemberMentioned(client.user))
	{
		message.reply( 'やりますねぇ！' );
		return;
	}
  //さいころ
 // メッセージの文字列による条件分岐
    if (message.content === 'こん') {

        let channel = message.channel;
        let author = message.author.username;
        let reply_text = `こんばんわ。${author}様。`;

        // そのチェンネルにメッセージを送信する
        channel.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;
    }
  
});

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );