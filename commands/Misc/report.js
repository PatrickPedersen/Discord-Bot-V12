module.exports.run = (bot, message, args) => {
    message.delete();
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!target) {
        return message.channel.send("Please provide a valid user").then(m => m.delete({ timeout: 15000}));
    }
    let reason = args.slice(1).join(" ");
    if (!reason) {
        return message.channel.send(`Please provide a reason for reporting **${target.user.tag}**`).then(m => m.delete({ timeout: 15000}));
    }
    let sChannel = message.guild.channels.cache.find(x => x.name === "reports");
    if (!sChannel) {
        return message.channel.send("No reports channel found! Please notify staff to solve this issue.").then(m => m.delete({ timeout: 15000}));
    }
    message.channel.send("Your report has been filed to the staff team. Thank you!").then(m => m.delete({ timeout: 15000}));
    sChannel.send(`**${message.author.tag}** has reported **${target.user.tag}** for **${reason}**.`).then(async msg => {
        await msg.react("✅");
        await msg.react("❌");
    });
};

module.exports.help = {
    name: 'report',
    aliases: [],
    description: 'Reports a user',
    usage: "<user> <reason>",
    category: "Misc",
    guildOnly: true,
    args: true,
    accessableby: 'Member',
};