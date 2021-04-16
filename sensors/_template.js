'use strict';

const name = '_template';
const description = 'This is template';

const words = [
  'Template', 'Example'
];

/**
 * @param {Discord.Message} message
 * @param {string} word マッチしたワード
 */
const execute = (message, word=null) => {
};

module.exports = {
  name,
  description,
  words,
  execute,
};
