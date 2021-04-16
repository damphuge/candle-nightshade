'use strict';

const { DBClient, dbConfig } = require('../db');

const name = 'words';
const description = '登録単語の検索システム';

/**
 * @param {Discord.Message} message
 * @param {Array.<string>} args
 */
const execute = (message, args) => {
  const limit = 100;
  let query = 'SELECT word FROM messages'
  if (args.length) {
    query = query + ' WHERE ' +
      args.map(keyword => `word LIKE '%${keyword}%'`).join(' AND ');
  }
  query = `${query} LIMIT ${limit}`;
  console.log(`SQL: ${query}`)

  const dbClient = new DBClient(dbConfig);

  dbClient.connect();
  dbClient
    .query(query)
    .then(res => {
      if(res.rows.length == 0) {
        message.reply('http://scp-jp.wikidot.com/scp-511-jp');
        return;
      }
      const result = res.rows.map(row => row.word).join(', ');
      message.reply(`${res.rows.length}件取得`, { code: result });
      return;
    })
    .catch(err => {
      console.error(err);
      message.reply('エラった');
    });

  return;
};

module.exports = {
  name,
  description,
  execute,
  args: false,
  usage: '<?単語> (<単語>, ...)',
};
