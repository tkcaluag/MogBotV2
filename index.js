const DiscordJS = require('discord.js');
const { Intents } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('MogBot is online!')
})

const guildId = 'paste server id here'
const guild = client.guilds.cache.get(guildId)
let commands

if(guild) {
    commands = guild.commands
} else {
    commands = client.application?.commands
}

commands?.create({
    name: 'amog',
    description: 'replies with os'
})

client.on('interactionCreate', async (interaction) => {
  if(!interaction.isCommand()) {
      return
  }  
  
  const { commandName, options } = interaction
  
  if(commandName === 'mog') {
      interaction.channel.send({
          content: 'os',
      })
  }
 
})

client.on('messageCreate', (message) => {
    if(message.content === 'mog') {
        message.channel.send('os');
    }
})

client.login(process.env.TOKEN)