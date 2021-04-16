'use strict';

const name = '日本地図';

const words = [
  'にほん'
];

/**
 * @param {Discord.Message} message
 * @param {string} word マッチしたワード
 */
const execute = (message, word=null) => {
    let author = message.author.username;
    // そのチェンネルにメッセージを送信する
    message.reply("text",{files: [{ attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fmap-japan-10210.png?v=1566197317736", name: "test.png" }]});
    return;
};

module.exports = {
  name,
  description: null,
  words,
  execute,
};
