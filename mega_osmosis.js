const osmosis = require('osmosis');

/**
 * ボーナス回数の取得
 *
 * @param {string} url
 * @return {Array.<Object>} results - ボーナス回数の配列
 *         {string} results[0].name - ボーナス名
 *         {number} results[0].time - 回数
 */
function fetchBounus(url) {
  return new Promise((resolve, reject) => {
    let results = [];
    osmosis.get(url)
      .find('p:has(b)')
      .set({
        name: 'text()',
        time: 'b'
      })
      .data(item => {
        console.log(item);
        results.push(item);
      })
      .done(() => resolve(results));
  });
}

/**
 * 機種台情報の取得
 *
 * @param {string} url
 * @return {Object} result - 台情報
 *         {string} result.title - 機種名
 *         {string} result.number - 台番号
 */
function fetchMachineInfo(url) {
  return new Promise((resolve, reject) => {
    let result = {}
    osmosis.get(url)
      .find('div:has(h3 b)')
      .set({
        title: 'h3:skip(1)',
        number: 'h3:last'
      })
      .data(item => result = item)
      .done(() => resolve(result))
  });
}

async function constructResText(url) {
  const machine = await fetchMachineInfo(url)
  const bounuses = await fetchBounus(url)
  return `${machine.title}（${machine.number}）\nBB: ${bounuses.find(x => x.name == 'BB').time}回, RB: ${bounuses.find(x => x.name == 'RB').time}回`
}

function mega_osmosis(message, ch) {
  console.log("mega_new_runnnig");

  const mystr = message.content;
  const machineNumber = mystr.replace(/[^0-9]/g, '');

  const channel = message.channel;
  const author = message.author.username;

  // そのチェンネルにメッセージを送信する
  const firstHalfOfUrl = 'http://hall.gaia-jp.com';
  const url = `${firstHalfOfUrl}/sp/mb/playdatas/sdetail?st=aom&rb=S20&mno=${machineNumber}&rt=t`;
  const image = `${firstHalfOfUrl}/sp/gdrawmb.php?st=aom&dt=t&mno=${machineNumber}`;

  constructResText(url).then((text) => {
    console.log(text)
    message.reply(text + "\n だハメ！どうせ改ざんハメ",{files: [{ attachment: image, name: "mega_data.png" }]});
  });
}

module.exports.mega_func = mega_osmosis;
