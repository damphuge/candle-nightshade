'use strict';

const { resolve: r } = require('path');
const cjk = require('cjk-regex');
const { MessageAttachment } = require('discord.js');
const { prefix } = require('../config');

const name = 'amni';
const description = '魅せますか……………';

/**
 * 1-10 文字の言葉を天内悠に喋らせるコラ画像生成bot
 * cjk文字１０文字以内を受け取り、canvas で画像にセリフを書き込む
 *
 * @param {Discord.Message} message
 * @param {Array.<string>} args
 */
const execute = async (message, args) => {
  let misemasuka = args.shift();

  const cjkRune = `(?:${cjk().toString()})`;
  const regex = new RegExp(`^${cjkRune}{1,10}$`);
  const match = regex.exec(misemasuka);
  if (match === null) {
    console.error(`[${name}] reject arg: "${misemasuka}", unicode: ${escape(misemasuka)}`);
    message.reply('１～１０文字でお願いするンゴねぇ～');
    return;
  }
  misemasuka = match[0];

  // 画像処理
  const { createCanvas, loadImage, registerFont } = require('canvas');

  registerFont(r(__dirname, '../assets/07YasashisaAntique.otf'), { family: 'YasashisaAntique'});

  const canvas = createCanvas(480, 511);
  const ctx = canvas.getContext('2d');

  const image = await loadImage('https://i.imgur.com/Ud3VrYx.jpg')
  const runeLeaderImage = await loadImage('https://i.imgur.com/8RL2Y1W.jpg')
  // (22, 22) の '︙'画像

  const base = { x: 53, y: 89 };
  // runeLeaderImage のサイズが fontsize=22 を想定。変更するなら拡大縮小対応が必要か
  const fontsize = 22
  console.log("image loaded", image);
  ctx.drawImage(image, 0, 0, 480, 511);

  // 文字領域を白で塗りつぶす
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.fillRect(base.x - fontsize, base.y - fontsize, fontsize * 2 + 1, fontsize * 5 + 15);

  ctx.font = `${fontsize}px "YasashisaAntique"`;
  ctx.fillStyle = "rgb(45, 45, 45)"

  // 縦書きなので一文字ずつ
  misemasuka.split('')
    .forEach((rune, index) => {
      const x = base.x + (index < 5 ? 0 : -fontsize-7);
      const y = base.y + fontsize * (index % 5) + index % 5;
      ctx.fillText(rune, x, y);
    });
  for(let i=misemasuka.length; i<10; i++) {
    const x = base.x + (i < 5 ? 0 : -fontsize-7);
    const y = base.y + fontsize * (i % 5) + i % 5 - fontsize + 4;
    ctx.drawImage(runeLeaderImage, x, y, 22, 22);
  }

  const attachment = new MessageAttachment(canvas.toBuffer(), 'amanai-image.jpg');
  message.channel.send(attachment);

  return;
};

module.exports = {
  name,
  description,
  execute,
  args: true,
  usage: '<１～１０文字>',
};
