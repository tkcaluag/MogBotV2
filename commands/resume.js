module.exports = {
    name: 'resume',
    // aliases: ['resume', 'unpause'],
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue`)
      if (queue.paused) {
        queue.resume()
        return message.channel.send('▶  Resumed')
      } else {
        message.channel.send('its not paused!!!!!')
      }
    }
  }