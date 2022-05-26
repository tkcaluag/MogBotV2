const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('adds two things')
        .addIntegerOption(option =>
            option.setName('num1')
                .setDescription('the first number')
                .setRequired(true));
        .addIntegerOption(option =>
            option.setName('num2')
                .setDescription('the second number')
                .setRequired(true));
        
    async execute(interaction) {
        const num1 = options.getInteger('num1')
        const num2 = options.getInteger('num2')

      await interaction.reply({
          content: `The sum is ${num1+num2}`,
      })
    }
}