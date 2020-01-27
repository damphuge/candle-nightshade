var url;
 function mega_func(ch) {

   console.log("mega_new_runnnig");

   var mystr =message.content;
   var result = mystr.replace(/[^0-9]/g, '');

   let channel = message.channel;
   let author = message.author.username;

   // そのチェンネルにメッセージを送信する
   var url ="http://hall.gaia-jp.com/sp/mb/playdatas/sdetail?st=aom&rb=S20&mno=" + result;

   var image = "http://hall.gaia-jp.com/sp/gdrawmb.php?st=aom&dt=t&mno=" + result;

   ch.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.131 Safari/537.36';
   ch.fetch(url, { q: 'node.js'}, function (err, $, res) {
        // レスポンスヘッダを参照
        // console.log(res.headers);

        // HTMLタイトルを表示
        //console.log($('title').text());
        info = $('b').text();
        //console.log($('b').text());
        console.log(info);
        message.reply(info+"だハメ！どうせ改ざんハメ",{files: [{ attachment: image, name: "mega_data.png" }]});
   });

   return;
    }


module.exports.mega_func = mega_func;
