const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("shuffles the queue"),

        run: async({ client, interaction }) => {

            const queue = client.player.getQueue(interaction.guildId)

            if (!queue) return await interaction.editReply("there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue")

            queue.shuffle()

            await interaction.editReply("✅ The queue has been shuffled!")
        }

}