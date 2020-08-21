const { duration } = require('../../util/functions');

module.exports.run = (bot, message, args) => {
    message.channel.send(`I have been online for: ${duration(bot.uptime)}`);
};

module.exports.help = {
    name: 'uptime',
    aliases: [],
    description: 'Displays the bots current uptime!',
    usage: "",
    category: "Misc",
    guildOnly: true,
    args: false,
    accessableby: 'Member',
};