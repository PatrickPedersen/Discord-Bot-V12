module.exports.run = (bot, message, args) => {
        message.channel.send('Pong.');
};

module.exports.help = {
    name: 'ping',
    aliases: ['foo', 'pong'],
    description: 'Pong!',
    usage: " ",
    category: "Misc",
    guildOnly: true,
    args: false,
    accessableby: 'Members',
};