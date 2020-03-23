const osmosis = require('osmosis');
function fetchBounus() {
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
  return `${machine.title}（${machine.number}）\nBB: ${bounuses.find(x => x.name == 'RB').time}回, RB: ${bounuses.find(x => x.name == 'RB').time}回`
}

function mega_osmosis(message, ch) {
  console.log("mega_new_runnnig");

  const mystr = message.content;
  const result = mystr.replace(/[^0-9]/g, '');

  const channel = message.channel;
  const author = message.author.username;

  // そのチェンネルにメッセージを送信する
  const url ="http://hall.gaia-jp.com/sp/mb/playdatas/sdetail?st=aom&rb=S20&mno=" + result;
  const image = "http://hall.gaia-jp.com/sp/gdrawmb.php?st=aom&dt=t&mno=" + result;

  let res_text = ''
  constructResText(url).then((text) => {
    res_text = text
  });
  console.log(test)
  message.reply(res_text + "\n だハメ！どうせ改ざんハメ",{files: [{ attachment: image, name: "mega_data.png" }]});
  return;
}
module.exports.mega_func = mega_osmosis;
