const youtube_alias_url = {
  "るる": "UC_a1ZYZ8ZTXpjg9xUY9sj8w",
  "ロア": "UCCVwhI5trmaSxfcze_Ovzfw",
  "リゼ": "UCZ1xuCK1kNmn5RzPYIZop3w",
  "しいしい": "UC_4tXjqecqox5Uc05ncxpxg"
}

const token = process.env.YOUTUBE_TOKEN;
/*
  Youtube LiveのURLを返信する。
  
  @param String $alias あだ名
  @return String $text youtube_url
*/
let getUrl = function(alias) {
  let text = 'You are FRIEND:) https://www.youtube.com/channel/UC2jBqh7fCEPuTdpwKmxHvjA';
  if(alias in youtube_alias_url){
    text = youtube_alias_url[alias];
  }
  return text;
  /*
  message.reply(reply_text)
    .then(message => console.log(`Sent message: $(reply_text)`))
    .catch(console.error);
  return;
  */
}

/*
  https://omocoro.jp/kiji/12157/ oldest
  https://omocoro.jp/kiji/188733/ newest
  hit: 200
  200のlistを作ってファイル保存→あとで読み込んでそこからランダム
*/
// exports
module.exports = {
  getUrl: getUrl
}