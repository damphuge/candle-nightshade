'use strict';

/**
 * @var {string} name この名前で実行される
 * @var {?string} description 説明
 */
const name = '_template';
const description = 'This is template';

/**
 * 実行される関数
 *
 * @param {Discord.Message} message
 * @param {Array.<string>} args
 *
 * @example <caption>args</caption>
 * // メッセージ内容："!command foo bar"
 * args==["foo", "bar"]
 */
const execute = (message, args) => {
};

/**
 * @var {?boolean} args 引数が必要か
 * @var {?string} usage コマンド引数の説明
 *
 * @example <caption>usage</caption>
 * '<arg1> <arg2>'
 */
module.exports = {
  name,
  description,
  execute,
  // args: true,
  // usage: '',
};
