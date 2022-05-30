const { SlashCommandBuilder } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Stops the bot and clears the queue"),

        run: async({interaction, client}) => {
            const queue = client.player.getQueue(interaction.guildId)
            
            if(!queue)
            return await interaction.editReply("there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue")

            queue.destroy()
            await interaction.editReply("👋 Bye!")
        }
}
