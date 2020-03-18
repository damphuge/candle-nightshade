const osmosis = require('osmosis');
function scrapePtag() {
  return new Promise((resolve, reject) => {
    let results = [];
    osmosis.get('http://hall.gaia-jp.com/sp/mb/playdatas/sdetail?st=aom&rb=S20&mno=1501')
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
scrapePtag()
  .then(data => {
    console.log(data)
    console.log(data.find(element => element.name == 'BB'))
  })

function mega_func(message,ch) {
  console.log("mega_new_runnnig");

  const mystr =message.content;
  const result = mystr.replace(/[^0-9]/g, '');

  const channel = message.channel;
  const author = message.author.username;

  // そのチェンネルにメッセージを送信する
  const url ="http://hall.gaia-jp.com/sp/mb/playdatas/sdetail?st=aom&rb=S20&mno=" + result;

  const image = "http://hall.gaia-jp.com/sp/gdrawmb.php?st=aom&dt=t&mno=" + result;

  ch.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36';
  ch.fetch(url, {q: 'node.js'}, function(err, $, res){
    // レスポンスヘッダを参照
    let body;
    //html抜き出し
    body = $('body').html();

    let name;

    // HTMLタイトル（台名称）を表示
    name = $('b').text();
    test = $('p').text();

    console.log(test)
    //name形成関数
    name = del_sp_br (name)
    message.reply(name + " \n だハメ！どうせ改ざんハメ",{files: [{ attachment: image, name: "mega_data.png" }]});
  });
  return;
}

function del_sp_br (str){
  //改行削除
  str.replace(/\r?\n/g, '');

  //空白削除
  str = str.trim();

  str = " "+str+" "
    return str
}
// module.exports.mega_func = mega_func;

