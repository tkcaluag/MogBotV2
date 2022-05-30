const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mog')
        .setDescription('replies with os'),
    run: async ({client, interaction}) => {
        await interaction.editReply('os');
    }
}