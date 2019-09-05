

 function test(message) {
        //アローラオーキド博士 
   if (message.content === 'アローラオーキド博士') {
        console.log("オーキド博士");
        let channel = message.channel;
        let author = message.author.username;
        // そのチェンネルにメッセージを送信する
        message.reply("ファッキュー・・・ぶち殺すぞ",{files: [{ attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fa_okd.jpg?v=1567130077289", name: "okd.png" }]});
        return;
    }
    }


module.exports.test = test;