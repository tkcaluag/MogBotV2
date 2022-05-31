const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("song")
        .setDescription("options for the current song playing")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("pause")
                .setDescription("pauses the current song"))
        .addSubcommand((subcommand) =>
            subcommand 
                .setName("resume")
                .setDescription("resumes the current song"))
        .addSubcommand((subcommand) =>
            subcommand
                .setName("info")
                .setDescription("outputs the info of the current song playing")),

    run: async({interaction, client}) => {

        const queue = client.player.getQueue(interaction.guildId)

        if(interaction.options.getSubcommand() === "pause") {
            if (!queue) return await interaction.editReply("there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue")
            
            queue.setPaused(true)
            await interaction.editReply("⏸ Music has been paused!")
        }

        if(interaction.options.getSubcommand() === "resume"){
            if (!queue) return await interaction.editReply("there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue")
        
            queue.setPaused(false)
            await interaction.editReply("▶ Music has been resumed!")
        }

        if(interaction.options.getSubcommand() === "info") {
            if (!queue) return await interaction.editReply("there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue")
        
            let bar = queue.createProgressBar({
                queue: false,
                length: 19,
            })

            const song = queue.current

            await interaction.editReply({
                embeds: [new MessageEmbed()
                .setThumbnail(song.thumbnail)
                .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)],
            })

        }
    }
}