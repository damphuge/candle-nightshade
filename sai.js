

 function test(message) {
        //アローラオーキド博士 

        let channel = message.channel;
        let author = message.author.username;
        var num = Math.floor( Math.random() * 6 + 1 );
        let reply_text = `${author}のさいころの出目は`+ num;
        
       
       switch( num ) {


    case 1:
        console.log("1");
        break;


    case 2:
        console.log("2");
        break;
           
    case 3:
        console.log("3");
        break;


    case 4:
        console.log("4");
        break;
    
    case 5:
        console.log("5");
        break;
           
    case 6: console.log("6");
}
   
   
        // そのチェンネルにメッセージを送信する
        message.reply("text",{files: [{ attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fokd.jpg?v=1567130070416", name: "okd.png" }]});

        message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;
   
    }


module.exports.test = test;