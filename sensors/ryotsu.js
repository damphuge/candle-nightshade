'use strict';

const name = 'お仕置き執行人津波両夢';
const description = '差別を許さない';

const words = [
  '差別', '黒人', '朝鮮', '在日', 'チョッパリ', 'SS', 'ナチ'
];

/**
 * @param {Discord.Message} message
 * @param {string} word マッチしたワード
 */
const execute = (message, word=null) => {
  let author = message.author.username;
  // そのチェンネルにメッセージを送信する
  message.reply("差別検知!!津波両夢は差別を許しません!",{files: [{ attachment: "https://cdn.discordapp.com/attachments/768317965800046602/827823207553040414/88808193_p0_master1200.jpg", name: "津波両夢.png" }]});
  return;
};

module.exports = {
  name,
  description,
  words,
  execute,
};
