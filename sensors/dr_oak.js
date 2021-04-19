'use strict';

const name = 'オーキド博士';
const description = null;

const words = [
  'オーキド博士'
];

/**
 * @param {Discord.Message} message
 * @param {string} word マッチしたワード
 */
const execute = (message, word=null) => {
  console.log("オーキド博士");
  let author = message.author.username;
  // そのチェンネルにメッセージを送信する
  message.reply("text", { files: [
    {
      attachment: "https://cdn.glitch.com/279b9a42-2a14-4625-a99c-585d8820443e%2Fokd.jpg?v=1567130070416",
      name: "okd.png"
    }
  ]});
  return;
};

module.exports = {
  name,
  description,
  words,
  execute,
};
