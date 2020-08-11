module.exports.run = (bot, message, args) => {
    if (args[0] === 'foo') {
        return message.channel.send('bar');
    }

    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
};

module.exports.help = {
    name: 'args-info',
    aliases: [],
    description: 'Information about the arguments provided.',
    usage: "",
    category: "Developer",
    guildOnly: true,
    args: true,
    accessableby: 'Developer',
};