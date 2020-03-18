 function gb_func(message,ch) {

   //ジェネラルバトル

        let channel = message.channel;
        let author = message.author.username;
       
       
         
        let reply_text ="ジェネラルバトル！！！\n"
        
        let juj = random();
   
        // そのチェンネルにメッセージを送信する
    message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
            
        return;
    }

//ランダム文字列
function random() {
var rand = Math.floor( Math.random() * 100) ; //おみくじの目の生成
  let msg = "勝利";
	if (rand < 50) msg = "敗北";
return msg;
}

module.exports.gb_func = gb_func;