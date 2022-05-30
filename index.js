const DiscordJS = require('discord.js');
const fs = require("fs");
const { Client, Intents, Collection } = require('discord.js');
const dotenv = require('dotenv');
const { Player } = require("discord-player");

dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
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

const eventFiles = fs
    .readdirSync("./events")
    .filter(file => file.endsWith('js'));
    
for(const file of eventFiles) {
    const event = require(`./events/${file}`);
    
    if (event.once) {
        client.once(event.name, (...args ) =>  event.execute(...args, commands));
    } else {
        client.on(event.name, (...args ) =>  event.execute(...args, commands));
    }
}

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
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


client.login(process.env.TOKEN);