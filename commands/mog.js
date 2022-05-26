const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mog')
        .setDescription('replies with os'),
    async execute(interaction) {
        await interaction.reply('os');
    }
}