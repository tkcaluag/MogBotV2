module.exports = {
    name: 'shuffle',
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue`)
      queue.shuffle()
      message.channel.send('🔀  Shuffled!')
    }
  }