
var url;
 function test(message) {
        //アローラオーキド博士

        let channel = message.channel;
        let author = message.author.username;
        var num = Math.floor( Math.random() * 6 + 1 );
        let reply_text = `${author}のさいころの出目は`+ num;
        //aa

      url ="https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2F6d_0" + num + ".gif";


        // そのチェンネルにメッセージを送信する

          message.reply("掴みとれ！!",{files: [{ attachment:url, name: "sai.gif" }]})
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;

    }


module.exports.test = test;
