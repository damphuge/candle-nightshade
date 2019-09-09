// require
// npm install googleapis --save
// npm install google-auth-library --save


const youtube_alias_url = {
  "るる": "UC_a1ZYZ8ZTXpjg9xUY9sj8w",
  "ロア": "UCCVwhI5trmaSxfcze_Ovzfw",
  "リゼ": "UCZ1xuCK1kNmn5RzPYIZop3w",
  "しいしい": "UC_4tXjqecqox5Uc05ncxpxg",
}

const token = process.env.YOUTUBE_TOKEN;

// YouTubeの特定のチャンネルに紐付く動画を取得する。（YouTube Data API (v3) Search） - Qiita: https://qiita.com/yuji_saito/items/8f472dcd785c1fadf666
search = {
  part=snippet,
  key=token,
  channelId=
  maxResults=50
  order=date
  pageToken=
}

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
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
  hit: 200
  200のlistを作ってファイル保存→あとで読み込んでそこからランダム
*/
// exports
module.exports = {
  getUrl: getUrl
}