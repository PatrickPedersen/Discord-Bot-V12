const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../package.json');
const { utc } = require('moment');

module.exports.run = (bot, message, args) => {

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString();
        const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `;
    }

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
    category: "Member",
    guildOnly: true,
    args: false,
    accessableby: 'Member',
};