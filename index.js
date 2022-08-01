const DiscordJS = require('discord.js');
const fs = require("fs");
const { Intents, Collection, ActivityType } = require('discord.js');
const { EmbedBuilder } = require("discord.js")
const { DisTube } = require('distube')
const dotenv = require('dotenv');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const config = require('./config.json')
// const keepAlive = require('./server')

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
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new DiscordJS.Collection();
client.aliases = new DiscordJS.Collection();
client.emotes = config.emoji

const eventFiles = fs
  .readdirSync("./events")
  .filter(file => file.endsWith('js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, commands));
  } else {
    client.on(event.name, (...args) => event.execute(...args, commands));
  }
}

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Could not find any commands')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    client.commands.set(cmd.name, cmd)
  })
  console.log("Commands Loaded!")
})

client.on("interactionCreate", (interaction) => {
  async function handleCommand() {
    if (!interaction.isCommand()) return

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) interaction.reply("Not a valid slash command")

    await interaction.deferReply()
    await command.run({ client, interaction })
  }
  handleCommand()
})

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  const prefix = config.prefix
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`you need to be in vc you silly goose`)
  }
  try {
    cmd.run(client, message, args);
  } catch (e) {
    console.error(e)
    message.channel.send('⛔ This is not a valid slash command')
  }
})

const status = queue =>


  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

client.distube

.on('playSong', (queue, song) =>

    queue.textChannel.send({embeds: [new EmbedBuilder()
      .setAuthor({name: 'Now Playing...', iconURL: 'https://c.tenor.com/SumAMhoE7EgAAAAi/among-us.gif'})
      .setDescription( `**[${song.name}](${song.url})**`)
      .setThumbnail(song.thumbnail)
      .addFields(
        { name: 'Requested By', value: `${song.member}`, inline: true},
        { name: 'Duration', value: `${song.formattedDuration}`, inline: true}
      )
    
    ]})
  )

  .on('addSong', (queue, song) =>
    queue.textChannel.send({embeds: [new EmbedBuilder()

      .setDescription(`🎶  **[${song.name}](${song.url})** has been added to the Queue`)
      .setFooter({ text: `Duration: ${song.formattedDuration}`})

    ]}))

  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `${client.emotes.success} | Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`
    )
  )

  .on('error', (channel, e) => {
    if (channel) channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })

  .on('empty', channel => channel.send('amoooooooog'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
  )


client.login(process.env.TOKEN);