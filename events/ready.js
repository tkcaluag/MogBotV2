const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { ActivityType } = require('discord.js');
require("dotenv").config();

module.exports = {
    name: "ready",
    once: true,
    
    execute (client, commands) {
          console.log('MogBot is online!');

    let date = new Date()
    let day = date.getDay();
    let hour  = date.getHours();
    let minutes  = date.getMinutes();

        function status() {
            date = new Date()
            day = date.getDay();
            hour = date.getHours();
            minutes = date.getMinutes();
        
            if(day == 0) {
                if(hour >= 2) {
                    client.user.setPresence({ activities: [{type: ActivityType.Watching, name: 'One Piece'}]})
                }
        }

            else if((day == 6 && hour == 12 && minutes >= 30) || (day == 6 && hour > 12)) {
               client.user.setPresence({ activities: [{type: ActivityType.Watching, name: 'Aoashi'}]})
            }
              
            else if((day == 1 && hour == 13 && minutes >= 30) || (day == 1 && hour > 13)) {
                client.user.setPresence({ activities: [{type: ActivityType.Watching, name: 'Classroom of the Elite'}]})
            }
              
            else if((day == 4 && hour == 17 && minutes >= 30) || (day == 4 && hour > 17)) {
              client.user.setPresence({activities: [{type: ActivityType.Watching, name: 'Call of the Night'}]})
            }

            else if((day == 5 && hour == 6 && minutes >= 30) || (day == 5 && hour > 6)) {
              client.user.setPresence({activities: [{type: ActivityType.Watching, name: 'Rent a Girlfriend'}]})
            }
              
            else {
                client.user.setPresence({ activities: [{type: ActivityType.Playing, name: 'AMONG US'}]})
            }
        
        }

    setInterval(status, 15000)

    }
}