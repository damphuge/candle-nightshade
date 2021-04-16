'use strict';

const kitagawa  = require('../lib/kitagawa.js');

const name = 'kita';
const description = 'きたがわ';

/**
 * @param {Discord.Message} message
 * @param {Array.<string>} args
 */
const execute = (message, args) => {
  console.log("きたがわ");
  kitagawa.kitagawa_func(message);
  return;
};

module.exports = {
  name,
  description,
  execute,
  args: false,
  // usage: '',
};
