var url;
 function test(message) {
        //kirito

        let channel = message.channel;
        let author = message.author.username;
        // var num = Math.floor( Math.random() * 6 + 1 );
        // let reply_text = `${author}のさいころの出目は`+ num;
        
       
      url ="https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2F20190909000720.gif?v=1568016573038";

   
        // そのチェンネルにメッセージを送信する

          message.reply("スターバーストストリーム！!",{files: [{ attachment:url, name: "kirito.gif" }]});
        return;
   
    }


module.exports.test = test;