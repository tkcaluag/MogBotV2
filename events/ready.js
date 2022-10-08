const { ActivityType } = require('discord.js');
require("dotenv").config();
const fs = require("fs");
const config = require('../config.json')
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "ready",
  once: true,

  execute(client, commands) {
    console.log('MogBot is online!');

    client.on('messageCreate', async message => {
      if (message.author.bot || !message.guild) return
      const prefix = config.prefix
      if (!message.content.startsWith(prefix)) return
      const args = message.content.slice(prefix.length).trim().split(/ +/g)
      const command = args.shift().toLowerCase()
      const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
      if (!cmd) return
      if (cmd.inVoiceChannel && !message.member.voice.channel) {
        return message.channel.send(`you need to be in vc you silly goose`)
      }
      try {
        cmd.run(client, message, args);
      } catch (e) {
        console.error(e)
        message.channel.send('⛔ This is not a valid command')
      }
    })

    const status = queue =>

      `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
      }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``


    client.distube

      .on('playSong', (queue, song) =>

        queue.textChannel.send({
          embeds: [new EmbedBuilder()
            .setAuthor({ name: 'Now Playing...', iconURL: 'https://c.tenor.com/SumAMhoE7EgAAAAi/among-us.gif' })
            .setDescription(`**[${song.name}](${song.url})**`)
            .setThumbnail(song.thumbnail)
            .addFields(
              { name: 'Requested By', value: `${song.member}`, inline: true },
              { name: 'Duration', value: `${song.formattedDuration}`, inline: true }
            )

          ]

        })
      )

      .on('addSong', (queue, song) =>
        queue.textChannel.send({
          embeds: [new EmbedBuilder()

            .setDescription(`🎶  **[${song.name}](${song.url})** has been added to the Queue`)
            .setFooter({ text: `Duration: ${song.formattedDuration}` })

          ]
        }))

      .on('addList', (queue, playlist) =>
        queue.textChannel.send(
          `${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length
          } songs) to queue\n${status(queue)}`
        )
      )

      .on('error', (channel, e) => {
        if (channel) channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
        else console.error(e)
      })

      .on('empty', channel => channel.send('amoooooooog'))
      .on('searchNoResult', (message, query) =>
        message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
      )

    let date = new Date()
    let day = date.getDay();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    var array = ["My Hero Academia", "Spy x Family", "Blue Lock"];

    function rotateShow(){
      x++;

      if(x > 2){
        x = 0;
      }

    }

    function statusUpdate() {
      date = new Date()
      day = date.getDay();
      hour = date.getHours();
      minutes = date.getMinutes();

      if (day == 0) {
        if (hour >= 2) {
          client.user.setPresence({ activities: [{ type: ActivityType.Watching, name: 'One Piece' }] })
        }
      }

      else if (day == 3 || (day == 4 && hour < 7)){
          if(hour == 16 || (hour > 16)){
            client.user.setPresence({ activities: [{type: ActivityType.Watching, name: "Mob Psycho 100 III"}] })
          }
      }


      else if (day == 6 || (day == 0 && hour < 2)) {

        const x = 0;

        if ((hour == 9 && minutes >= 30) || (hour > 9 && (hour <= 15 && minutes < 30))) {
          client.user.setPresence({ activities: [{ type: ActivityType.Watching, name: array.at(0) }] })
        }

        else if ((hour == 15 && minutes >= 30) || hour > 15 && hour < 18) {
          client.user.setPresence({ activities: [{ type: ActivityType.Watching, name: array.at(1) }] })
        }

        else if (hour == 18 || (hour > 18 || (day == 0 && hour < 2))) {

          x = 2;

          while (true) {
            client.user.setPresence({ activities: [{ type: ActivityType.Watching, name: array.at(x) }] })

            rotateShow(10000);
        }

      }
    }

      else {
        client.user.setPresence({ activities: [{ type: ActivityType.Playing, name: 'AMONG US' }] })
      }

    }

    setInterval(statusUpdate, 60000)


  }
}