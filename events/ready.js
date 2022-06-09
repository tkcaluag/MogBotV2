const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

module.exports = {
    name: "ready",
    once: true,
    
    execute (client, commands) {
          console.log('MogBot is online!');
    
    const CLIENT_ID = client.user.id;
    
    const rest = new REST({
        version: "9"
    }).setToken(process.env.TOKEN);
    
    (async () => {
        try {
            if(process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands,
                });
                
                console.log("Successfully registered commands globally.");
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), 
                    {
                    body: commands,
                    }
                );
                console.log("Successfully registered commands locally.");
            }
        } catch (err) {
            if(err) console.error(err);
        }
    })();

    let date = new Date()
    let day = date.getDay();
    let hour  = date.getHours();
    let minutes  = date.getMinutes();

        function status() {
            date = new Date()
            day = date.getDay();
            hour = date.getHours();
            minutes = date.getMinutes();
            console.log(day + " - " + hour + ":" + minutes)

            if(day == 5) {
                client.user.setPresence({ activities: [{type: 'WATCHING', name: 'Love is War'}]})
            }
        
            else if(day == 6) {
                if( (hour == 8 && minutes == 45) || (hour == 8 && minutes >= 45) || hour >= 8 ) {
                client.user.setPresence({ activities: [{type: 'WATCHING', name: 'Spy x Family'}]})
            }
        
                if(hour >= 19) {
                    client.user.setPresence({ activities: [{type: 'WATCHING', name: 'One Piece'}]})
                }
        }
        
            else if(day == 4) {
                client.user.setPresence({ activities: [{type: 'WATCHING', name: 'Morbius'}]})
            }
            else {
                client.user.setPresence({ activities: [{type: 'PLAYING', name: 'AMONG US'}]})
            }
        
        }

    setInterval(status, 15000)

    }
}