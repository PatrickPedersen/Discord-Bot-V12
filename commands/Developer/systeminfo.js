const { MessageEmbed } = require('discord.js');
const os = require('os');
const ms = require('ms');

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

module.exports.run = (bot, message, args) => {
    const core = os.cpus()[0];
    const embed = new MessageEmbed()
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor([200,0,0])
        .addField(`**❯ Platform:**`, process.platform,true)
        .addField(`**❯ Uptime:**`, ms(os.uptime() * 1000, { long: true }),true)
        .addField('\u200B','\u200B',true)
        .addField(`**❯ CPU:**`, [
            `\u3000 Cores: ${os.cpus().length}`,
            `\u3000 Model: ${core.model}`,
            `\u3000 Speed: ${core.speed}Mhz`])
        .addField(`**❯ Memory:**`,[
            `\u3000 Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
            `\u3000 Used: ${formatBytes(process.memoryUsage().heapUsed)}`])
        .setTimestamp()
    message.channel.send(embed)
};

module.exports.help = {
    name: 'systeminfo',
    aliases: ["system"],
    description: 'Shows details about the system the bot operates on!',
    usage: "",
    category: "Developer",
    guildOnly: true,
    args: false,
    accessableby: 'Developer',
};