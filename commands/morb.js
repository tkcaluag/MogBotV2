const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('morb')
        .setDescription('its morbin time'),
        run: async ({interaction, client}) => {
            await interaction.editReply('https://cdn.discordapp.com/attachments/957957351548260412/977613997559914557/full-1.webm');
        }
    
}