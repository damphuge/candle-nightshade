const random = require('random');

function kitagawa_func(message,ch) {
  //きたがわ
  const channel = message.channel;
  const author = message.author.username;
  const reply_text = rand_text();
  // そのチェンネルにメッセージを送信する
  message.reply(reply_text)
    .then(message => console.log(`Sent message: ${reply_text}`))
    .catch(console.error);
  return;
}

//ランダム文字列
function rand_text() {
  const serifs = [
    "おめんど！",
    "うしこら！",
    "おめんど集合！",
    "おめんど最低だ！",
    "おめんどうしこら～！"
  ];
  return random.choice(serifs);
}

module.exports.kitagawa_func = kitagawa_func;
