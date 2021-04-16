'use strict';

const name = 'タイマー';
const description = '';

const words = [
  'タイマー'
];

/**
 * @param {Discord.Message} message
 * @param {string} word マッチしたワード
 */
const execute = (message, word=null) => {
  console.log("time");
  var str = message.content;
  str.match(/([+-]?[0-9]+\.?[0-9]*)/g);
  //setTimeout(countup, 1000);

  let author = message.author.username;
  // そのチェンネルにメッセージを送信する
  return;
};

module.exports = {
  name,
  description,
  words,
  execute,
};
