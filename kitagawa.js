 function kitagawa_func(message,ch) {

   //きたがわ

        let channel = message.channel;
        let author = message.author.username;
       
        
         
      let reply_text = rand_text();

   
        // そのチェンネルにメッセージを送信する
    message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
            
        return;
    }

//ランダム文字列
function rand_text() {
  let msg;
	let rand = Math.floor(Math.random()*5);
	if (rand == 0) msg = "おめんど！";
	if (rand == 1) msg = "うしこら！";
	if (rand == 2) msg = "おめんど集合！";
	if (rand == 3) msg = "おめんど最低だ！";
	if (rand == 4) msg = "おめんどうしこら～！";
	return msg
}

module.exports.kitagawa_func = kitagawa_func;
