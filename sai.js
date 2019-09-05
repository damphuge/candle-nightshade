
var url;
 function test(message) {
        //アローラオーキド博士 

        let channel = message.channel;
        let author = message.author.username;
        var num = Math.floor( Math.random() * 6 + 1 );
        let reply_text = `${author}のさいころの出目は`+ num;
        
       
       switch( num ) {


    case 1:
        console.log("1");
           url ="https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2F6d_01.gif?v=1567669845406";

        break;

    case 2:
        console.log("2");
           url ="https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2F6d_02.gif?v=1567669858976";

        break;
           
    case 3:
        console.log("3");
 url ="https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2F6d_03.gif?v=1567669859424";

        break;


    case 4:
        console.log("4");
          url ="https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2F6d_04.gif?v=1567669859234";

        break;
    
    case 5:
        console.log("5");
         url ="https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2F6d_05.gif?v=1567669859465";

        break;
           
    case 6: console.log("6");
     url ="https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2F6d_06.gif?v=1567669859180";

}
   
   
        // そのチェンネルにメッセージを送信する

          message.reply("掴みとれ！",{files: [{ attachment:url, name: "sai.png" }]})
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;
   
    }


module.exports.test = test;