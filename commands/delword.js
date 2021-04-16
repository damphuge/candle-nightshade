'use strict';

const { DBClient, dbConfig } = require('../db');

const name = 'delword';
const description = '削除するンゴね';

/**
 * @param {Discord.Message} message
 * @param {Array.<string>} args
 */
const execute = (message, args) => {
  const word = args[0];

  const query = 'DELETE FROM messages WHERE word = $1';
  const dbClient = new DBClient(dbConfig)
  dbClient.connect();

  dbClient
    .query(query, [word])
    .then(res => {
      if (res.rowCount == 0) {
        message.reply('そんな単語はなかった')
        console.log(
          `Failed delete ${word} by ${message.member.displayName}<${message.member.id}>`
        );
        return;
      }
      console.log(`Delete ${word} by ${message.member.displayName}<${message.member.id}>`);
      message.reply(`削除しました`);
    })
    .catch(err => {
      console.error(err);
      message.reply(`エラーしたわ。原因は知らん`);
    })
    .finally(() => {
      dbClient.end();
    });
  return;
};

module.exports = {
  name,
  description,
  execute,
  args: true,
  usage: '<単語>',
};
