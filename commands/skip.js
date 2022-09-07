module.exports = {
    name: 'skip',
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue`)
      try {
        const song = await queue.skip()
        message.channel.send(`👍  Skipped!`)
      } catch (e) {
        message.channel.send(`${client.emotes.error}  ${e} \n Try doing "-leave"`)
      }
    }
  }