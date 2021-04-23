const { charset } = require('regexp-util');
const unicode = require('unicode-regex');

const kana  = unicode({ Script: ['Katakana', 'Hiragana'], });

const kanji = unicode({ Script: ['Han'], });

module.exports = {
  japanese: () => charset(kana, kanji),
  kana: () => charset(kana),
  kanji: () => charset(kanji),
}
