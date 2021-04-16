'use strict';

const sai = require('../lib/sai');

const name = 'さいころ';
const description = 'v2';

const words = [
  'さいころ'
];

/**
 * @param {Discord.Message} message
 * @param {string} word マッチしたワード
 */
const execute = (message, word=null) => {
  console.log("test");
  sai.test(message);
  return;
};

module.exports = {
  name,
  description,
  words,
  execute,
};
