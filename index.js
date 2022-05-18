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

    const guildId = '725133498293420073'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'mog',
        description: 'replies with os'
    })

    commands?.create({
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'num1',
                description: 'The first number.',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'The second number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER, 
            }
        ]
    })

})

client.on('interactionCreate', async (interaction) => {
  if(!interaction.isCommand()) {
      return
  }  
  
  const { commandName, options } = interaction
  
  if(commandName === 'mog') {
      interaction.reply({
          content: 'os',
          //ephemeral: true,
    })
  } else if (commandName === 'add') {
      const num1 = options.getNumber('num1')
      const num2 = options.getNumber('num2')

      interaction.reply({
          content: `The sum is ${num1+num2}`,
      })
  }
})

client.on('messageCreate', (message) => {
    if(message.content === 'mog') {
        message.channel.send('os');
    }
})

client.login(process.env.TOKEN)