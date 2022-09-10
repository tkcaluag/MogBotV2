
const DiscordJS = require('discord.js');
const fs = require("fs");
const { Intents, Collection, ActivityType } = require('discord.js');
const { EmbedBuilder } = require("discord.js")
const { DisTube } = require('distube')
const dotenv = require('dotenv');
const { SpotifyPlugin } = require('@distube/spotify')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const config = require('./config.json')

dotenv.config()

const client = new DiscordJS.Client({
  intents: [
    DiscordJS.GatewayIntentBits.Guilds,
    DiscordJS.GatewayIntentBits.GuildMessages,
    DiscordJS.GatewayIntentBits.GuildVoiceStates,
    DiscordJS.GatewayIntentBits.MessageContent
  ]
})

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new YtDlpPlugin()
  ]
})

    client.commands = new DiscordJS.Collection();
    client.aliases = new DiscordJS.Collection();
    client.emotes = config.emoji

const commands = [];

const eventFiles = fs
  .readdirSync("./events")
  .filter(file => file.endsWith('js'));

  fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err)
    const jsFiles = files.filter(f => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0) return console.log('Could not find any commands!')
    jsFiles.forEach(file => {
      const cmd = require(`./commands/${file}`)
      client.commands.set(cmd.name, cmd)
    })
    console.log("Commands Loaded!")
  })

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, commands));
  } else {
    client.on(event.name, (...args) => event.execute(...args, commands));
  }
}

client.login(process.env.TOKEN);