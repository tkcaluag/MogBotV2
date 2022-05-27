const DiscordJS = require('discord.js');
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9")
const { Client, Intents, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log('MogBot is online!')
    
    const CLIENT_ID = client.user.id;
    
    const rest = new REST({
        version: "9"
    }).setToken(process.env.TOKEN);
    
    (async () => {
        try {
            if(process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                
                console.log("Successfully registered commands globally.");
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    //Make sure to put GUILD_ID in the env file
                    body: commands
                });
                console.log("Successfully registered commands locally.");
            }
        } catch (err) {
            if(err) console.error(err);
        }
    })();

//     commands?.create({
//         name: 'mog',
//         description: 'replies with os'
//     })

//     commands?.create({
//         name: 'morb',
//         description: 'its morbin time'
//     })

//     commands?.create({
//         name: 'add',
//         description: 'Adds two numbers',
//         options: [
//             {
//                 name: 'num1',
//                 description: 'The first number.',
//                 required: true,
//                 type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
//             },
//             {
//                 name: 'num2',
//                 description: 'The second number',
//                 required: true,
//                 type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER, 
//             }
//         ]
//     })
    
//     commands?.create({
//         name: 'mid',
//         description: 'turns something into mid',
        
//         options: [{
//             name: 'name',
//             description: 'the name of mid',
//             required: true,
//             type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
//         }]
//     })

})

client.on('interactionCreate', async (interaction) => {
  if(!interaction.isCommand()) {
      return
  }  
  
  const command = client.commands.get(interaction.commandName);
  
  if(!command) return;
  
  try {
      await command.execute(interaction);
  } catch(err) {
      if (err) console.error(err);
      await interaction.reply({
          content: 'An error occured while executing that command',
          ephemeral: true,
      })
  }
  
//   const { commandName, options } = interaction
  
//   if(commandName === 'mog') {
//       interaction.reply({
//           content: 'os',
//           //ephemeral: true,
//     })
//   } else if (commandName === 'add') {
//       const num1 = options.getNumber('num1')
//       const num2 = options.getNumber('num2')

//       interaction.reply({
//           content: `The sum is ${num1+num2}`,
//       })
//   } else if (commandName === 'mid') {
//     const name = options.getString('name')
//     let midReply
//     if(name.length < 3){
//         midReply = "Mid"
//     } else {
//         midReply = "Mid" + name.substring(3)
//     }
    
//     let index
//     while(index > -1) {
//         index = midReply.indexOf(" ") + index
//         if(index != -1){
//             midReply = midReply.substring(0, index) + "mid" + midReply.substring(index+1)
//         }
//     }
    
    
//     interaction.reply({
//         content: midReply,
//     })
//   } else if (commandName === 'morb') {
//       interaction.reply({
//           content: 'https://cdn.discordapp.com/attachments/957957351548260412/977613997559914557/full-1.webm'
//       })
//   }
// })

// client.on('messageCreate', (message) => {
//     if(message.content === 'mog') {
//         message.channel.send('os');
//     }
});

client.login(process.env.TOKEN);