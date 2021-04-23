'use strict';

const { DBClient, dbConfig } = require('../db');
const moji = require('../lib/moji');

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
      args.map(keyword => `word LIKE '%${keyword}%'`).join(' OR ');
  }
  query = `${query} ORDER BY word ASC LIMIT ${limit}`;
  console.log(`SQL: ${query}`)

  const dbClient = new DBClient(dbConfig);

  dbClient.connect();
  dbClient
    .query(query)
    .then(res => {
      if(res.rows.length == 0) {
        console.log(`${args.join(', ')} の検索結果はありませんでした`);
        message.reply('これでも読んどくピィ http://scp-jp.wikidot.com/scp-511-jp');
        return;
      }
      const charTyper = new Map([
        ['isEisu', {
          name: '英数字', reg: /^[0-9a-zA-Z]/
        }],
        ['isKana', {
          name: 'かなカナ', reg: new RegExp(`^${moji.kana().toString()}`)
        }],
        ['isKanji', {
          name: '漢字', reg: new RegExp(`^${moji.kanji().toString()}`)
        }],
        ['isEtc', {
          name: 'etc.', reg: null
        }],
      ]);
      charTyper.forEach((v, k) => {
        if (!v.reg) {
          return
        }
        res.rows.forEach(r => {
          const flag = v.reg.test(r.word);
          r[k] = flag;
          r['isEtc'] = (r['isEtc'] ?? true) && !flag;
        })
      });

      let result = `${res.rows.length}件取得`;
      charTyper.forEach((v, k) => {
        const rows = res.rows.filter(r => r[k])
        if (rows.length == 0) {
          return
        }
        const _result = `【${v.name}】\n${rows.map(r => r.word).join(', ')}`;
        result = `${result}\n\n${_result}`
      });

      if(args.length) {
        console.log(`${args.join(', ')} の検索結果: ${res.rows.map(r => r.word).join(', ')}`);
      }
      message.reply(result, { code: true });
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
  usage: '<?単語> <?単語> ...',
};
