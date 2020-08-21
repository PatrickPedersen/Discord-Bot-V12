const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../package.json');
const { utc } = require('moment');
const { duration } = require('../../util/functions');

module.exports.run = (bot, message, args) => {

    let embed = new MessageEmbed()
        .setColor([200, 0, 0])
        .setAuthor(bot.user.username, bot.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))

        .addField(`**❯ Bot:**`, `${bot.user.tag}`, true)
        .addField(`**❯ Creation Date:**`, `${utc(bot.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`, true)
        .addField(`**❯ Creator**`, `${bot.config.Creator}`, true)

        .addField(`**❯ Node.js:**`, `${process.version}`, true)
        .addField(`**❯ Version:**`, `v${version}`, true)
        .addField(`**❯ Discord.js:**`,`v${djsversion}`,true)

        .setFooter(`Uptime: ${duration(bot.uptime)}`);
    return message.channel.send({ embed: embed });
};

module.exports.help = {
    name: 'botinfo',
    aliases: ["info","binfo","b-info"],
    description: 'Displays info about the bot!',
    usage: "",
    category: "Misc",
    guildOnly: true,
    args: false,
    accessableby: 'Member',
};