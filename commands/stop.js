module.exports = {
    name: 'stop',
    // aliases: ['disconnect', 'leave'],
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue `)
      queue.stop()
      message.channel.send(`⛔  Stopped!`)
    }
  }