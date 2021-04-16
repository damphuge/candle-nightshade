'use strict';

const { DBClient, dbConfig } = require('../db');
const { separations } = require('../util');
const { prefix } = require('../config');

const name = 'addword';
const description = '単語登録装置';

/**
 * @param {Discord.Message} message
 * @param {Array.<string>} args
 */
const execute = (message, args) => {
  const separator = `[${separations}]+`;
  const region = `[^${separations}]+`;
  const regex = new RegExp(`^${prefix}${name}${separator}(${region})${separator}([^]+)`)

  const matches = regex.exec(message.content);
  console.log(matches);

  if (matches === null) {
    console.log(`命令の形式にマッチしませんでした`);
    message.reply(
      'usage: `!addword 登録したいキーワード 登録したい説明文（改行可）`\n' +
      '※死ぬほど大きいAAには対応してないらしい。詳しくは俺もわからん'
    );
    return;
  }

  const keyWord = matches[1];
  const keyDescription = matches[2];

  const constraintName = 'messages_word_key';
  const insertQuery = `INSERT INTO messages (word, message) VALUES ('${keyWord}', '${keyDescription}')
          ON CONFLICT ON CONSTRAINT ${constraintName}
          DO UPDATE SET message='${keyDescription}'`;
  console.log(`SQL: ${insertQuery}`);

  const dbClient = new DBClient(dbConfig)

  dbClient.connect();
  dbClient
    .query(insertQuery)
    .then(res => {
      console.log(`Insert (${keyWord}: ${keyDescription})`);
      message.reply(`追加しました. \`!word ${keyWord}\` で試してみてくれ`);
    })
    .catch(err => {
      console.error(err);
      message.reply(`エラーしたわ。原因は知らん`);
    })
    .finally(() => dbClient.end());
  return;
};

module.exports = {
  name,
  description,
  execute,
  args: true,
  usage: '<単語> <それっぽい説明文、画像URLとか>',
};
