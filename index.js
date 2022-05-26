const DiscordJS = require('discord.js');
const { Intents } = require('discord.js');
const dotenv = require('dotenv');
import WOkCommands from 'wokcommands'
import path from 'path'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('MogBot is online!')
    
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands')
    })

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
        name: 'morb',
        description: 'its morbin time'
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
    
    commands?.create({
        name: 'mid',
        description: 'turns something into mid',
        
        options: [{
            name: 'name',
            description: 'the name of mid',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        }]
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
  } else if (commandName === 'mid') {
    const name = options.getString('name')
    let midReply
    if(name.length < 3){
        midReply = "Mid"
    } else {
        midReply = "Mid" + name.substring(3)
    }
    
    let index
    while(index > -1) {
        index = midReply.indexOf(" ") + index
        if(index != -1){
            midReply = midReply.substring(0, index) + "mid" + midReply.substring(index+1)
        }
    }
    
    
    interaction.reply({
        content: midReply,
    })
  } else if (commandName === 'morb') {
      interaction.reply({
          content: 'https://cdn.discordapp.com/attachments/957957351548260412/977613997559914557/full-1.webm'
      })
  }
})

client.on('messageCreate', (message) => {
    if(message.content === 'mog') {
        message.channel.send('os');
    }
})

client.login(process.env.TOKEN)