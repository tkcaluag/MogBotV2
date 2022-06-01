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
    
    const shows_list = [
        "One Piece",
        "Spy x Family",
        "Love is War",
        ]
    
    let x, y ,z
    let utc
    let current
    
    setInterval(function() {
    utc = new Date();
    
    current = utc.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        dateStyle: 'full',
        timeStyle: 'full',
    });
    
    x = current.getDay();
    y = current.getHours();
    z = current.getMinutes();
    }, 30000)


    if((x == 4 && y == 8) || y>=8){
    client.user.setPresence({
        activities: [{
            type: 'WATCHING',
            name: 'Love is War'
        }],

        status: 'online'
    })
    }
    
    if(x == 5){
        
    setInterval(function() {
        if ((y == 8 && z >= 45) || (y>=8)) {
        client.user.setPresence({
            activities: [{type: 'WATCHING', name: 'Spy x Family'}]})
        }
        
        if(y >= 19) {
            client.user.setPresence({ activites: [{ type: 'WATCHING', name: 'One Piece'}]})
        }
        }, 30000)
    }
    
    }
}