const youtube_alias_url = {
  "るる": "https://www.youtube.com/channel/UC_a1ZYZ8ZTXpjg9xUY9sj8w/live",
  "ロア": "https://www.youtube.com/channel/UCCVwhI5trmaSxfcze_Ovzfw",
  "リゼ": "https://www.youtube.com/channel/UCZ1xuCK1kNmn5RzPYIZop3w/live",
  "しいしい": "https://www.youtube.com/channel/UC_4tXjqecqox5Uc05ncxpxg/live"
}

let getUrl = function(alias) {
  let 
  if(!(alias in youtube_alias_url)){
}
if (message.content === 'さいころ') {
        console.log("test");
        let channel = message.channel;
        let author = message.author.username;
        var num = Math.floor( Math.random() * 6 + 1 ) ;
        let reply_text = `${author}のさいころの出目は`+ num;

        // そのチェンネルにメッセージを送信する
        message.reply(reply_text)
            .then(message => console.log(`Sent message: ${reply_text}`))
            .catch(console.error);
        return;
    }