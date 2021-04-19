'use strict';

const { Collection } = require('discord.js');
const { prefix } = require('./config');
const fs = require('fs');

const getJsFilesInDir = (dir) => {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.js') && !file.startsWith('_'));
}

/**
 * moduleReader.
 *
 * @param {string} dir
 * @return {Discord.Collection} mods
 */
const moduleReader = (dir) => {
  const mods = new Collection();
  for (const file of getJsFilesInDir(dir)) {
    const mod = require(`${dir}/${file}`);
    mods.set(mod.name, mod);
  }
  return mods;
}

/**
 * @param {string} content
 */
const removeChannel = (content) => {
  return content.replace(/<@#(?:\d+)>/, '');
}

/**
 * @param {string} content
 */
const removeRole = (content) => {
  return content.replace(/<@&(?:\d+)>/, '');
}

/**
 * @param {string} content
 */
const removeUser = (content) => {
  return content.replace(/<@!?(?:\d+)>/, '');
}

const removeMention = (content, flags) => {
  const { user, role, channel } = flags;
  if (user) content = removeUser(content);
  if (role) content = removeRole(content);
  if (channel) content = removeChannel(content);
  return content;
}

const separations = '\\s\\r\\n';

/**
 * commandUsage.
 *
 * @param {Object} command or sensor
 * @return {string} help
 */
const commandUsage = (command) => {
  const {name, words, args, usage, description} = {...command}
  console.log(name, words, args, usage, description);

  let help;

  const isSensor = Number.isInteger(words?.length);
  if (isSensor) {
    help = `単語：${words.join(', ')}`
    return help;
  }
  help = `${prefix}${name}`

  if (usage) {
    help = `${help} ${usage}`;
  }
  else if (args) {
    help = `${help} <なんか>`;
  }

  console.log(help)
  return help;
}

module.exports = {
  moduleReader,
  separations,
  commandUsage,
};
