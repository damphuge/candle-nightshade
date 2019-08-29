const youtube_alias_url = {
  "るる": "https://www.youtube.com/channel/UC_a1ZYZ8ZTXpjg9xUY9sj8w/live",
  "ロア": "https://www.youtube.com/channel/UCCVwhI5trmaSxfcze_Ovzfw",
  "リゼ": "https://www.youtube.com/channel/UCZ1xuCK1kNmn5RzPYIZop3w/live",
  "しいしい": "https://www.youtube.com/channel/UC_4tXjqecqox5Uc05ncxpxg/live"
}

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
*/
// exports
module.exports = {
  getUrl: getUrl
}