module.exports = {
    name: 'seek',
    inVoiceChannel: true,
    run: async (client, message, args) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue there is no queue`)
      if (!args[0]) {
        return message.channel.send(`enter it in seconds 🤦‍♂️`)
      }
      const time = Number(args[0])
      if (isNaN(time)) return message.channel.send(`not a valid number`)
      queue.seek(time)
    }
  }