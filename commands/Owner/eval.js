module.exports.run = (bot, message, args) => {

    if (message.author.id !== bot.config.creatorId) return;

    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        message.channel.send(bot.clean(evaled), {code:"js"});
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${bot.clean(err)}\n\`\`\``);
    }

};

module.exports.help = {
    name: 'eval',
    aliases: [],
    description: 'Evaluates a command',
    usage: "args",
    category: "Owner",
    guildOnly: true,
    args: true,
    accessableby: 'Owner',
};