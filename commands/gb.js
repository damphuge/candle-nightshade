'use strict';

const gb = require('../lib/gb.js');

const name = 'gb';
const description = 'ジェネラルバトル';

/**
 * @param {Discord.Message} message
 * @param {Array.<string>} args
 */
const execute = (message, args) => {
      console.log("ジェネラルバトル");
      gb.gb_func(message);
      return;
};

module.exports = {
  name,
  description,
  execute,
  args: false,
  // usage: '',
};
