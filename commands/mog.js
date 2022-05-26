import { ICommand } from "wokcommands";

export default {
    category: 'Testing'
    description 'replies with os',
    
    slash: true,
    testOnly: true,
    
    callback: ({ message }) => {
        message.reply('os')
    },
    
} as ICommand
