# Discord bot on working heroku (heroku移行後)

## discord.js version
discord.js@12.5.3

- how to check discord.js version 
```
root@DESKTOP-EK46360:/home/sonshi/candle-nightshade# heroku run npm list discord.js --app dis-bot-node
Running npm list discord.js on ⬢ dis-bot-node... up, run.5100 (Free)
npm WARN read-shrinkwrap This version of npm is compatible with lockfileVersion@1, but package-lock.json was generated for lockfileVersion@2. I'll try to do my best with it!
nara@0.0.0 /app
`-- discord.js@12.5.3
```
beforecheck: install heroku cli （でもGGnara以外loginできないんで～、ほしい人APIキーあげあす）

# Discord sample bot working on glitch.com(移行前)

## How to launch bot

1. Import this repository to `glitch.com`.
1. Add this line to `.env` file; `DISCORD_BOT_TOKEN={YOUR_DISCORD_BOT_USER_TOKEN}`
1. Just run on `glitch.com` !

To get discord bot token, visit discord official develoer site; https://discordapp.com/developers/applications/me/

## Running bot 24h on glitch.com

Applications on `glitch.com` may sleep when keep no access for 5 minutes.
You must ping application URL every 5 minutes to run your bot continuously.
Using `uptimerobot.com` service is just good.

