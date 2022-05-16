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

client.on('messageCreate', (message) => {
    if(message.content === 'mog') {
        message.channel.send('os');
    }
})

client.login(process.env.TOKEN)