const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('adds two things')
        .addIntegerOption(option =>
            option.setName('num1')
                .setDescription('the first number')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('num2')
                .setDescription('the second number')
                .setRequired(true)),
        
    run: async({client,interaction}) => {
        const num1 = interaction.options.getInteger('num1')
        const num2 = interaction.options.getInteger('num2')

      await interaction.editReply({
          content: `The sum is ${num1+num2}`
      })
    }
}