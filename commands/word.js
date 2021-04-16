'use strict';

const { DBClient, dbConfig } = require('../db');

const name = 'word';
const description = '登録文字列表示';

/**
 * @param {Discord.Message} message
 * @param {Array.<string>} args
 */
const execute = (message, args) => {
  // ４．基準文字列から後の文字列を切り出して表示 
  let messe = args.shift();
  const dbClient = new DBClient(dbConfig);

  dbClient.connect()

  dbClient
    .query(`SELECT message FROM messages WHERE word = '${messe}' LIMIT 1`)
    .then(res => {
      if(res.rows.length == 0) {
        message.reply(`そんな言葉は知らない. You should use \`!addword ${messe} <description>\`.`);
        return;
      }
      message.channel.send(res.rows[0].message);
    })
    .catch(err => {
      console.error(err);
      message.reply(`エラーしたわ。`);
      return;
    })
    .finally(()=> {
      dbClient.end();
    });


};

module.exports = {
  name,
  description,
  execute,
  args: true,
  usage: '<単語>',
};
