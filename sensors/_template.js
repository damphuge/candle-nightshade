'use strict';

/**
 * @var {string} センサー名、適当で良い
 * @var {?string} 説明
 */
const name = '_template';
const description = 'This is template';

/**
 * @var {Array.<string>} words 反応する単語の列
 */
const words = [
  'Template', 'Example'
];

/**
 * 反応時の動作関数
 *
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
