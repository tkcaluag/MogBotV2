module.exports = {
    name: 'pause',
    // aliases: ['pause', 'hold'],
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue `)
      if (queue.paused) {
        queue.resume()
        return message.channel.send('▶  Resumed')
      }
      queue.pause()
      message.channel.send('⏸  Paused')
    }
  }