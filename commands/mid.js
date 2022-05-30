const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mid')
        .setDescription('makes the thing mid')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('the show/movie that is going to be mid')
                .setRequired(true)
            ),
        
        run: async ({client, interaction}) => {
            const name = interaction.options.getString('name')
            let midReply
            if(name.length < 3){
                midReply = "Mid"
            } else if(name.length > 3){
            midReply = "Mid" + name.substring(3)
            }
            
            await interaction.editReply({
                content: midReply, 
            })
        }
    
}