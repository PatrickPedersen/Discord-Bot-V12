const { MessageEmbed } = require('discord.js');

module.exports = (client, newMessage, oldMessage) => {

    if (newMessage.author.bot) return;
    if (newMessage.channel.type !== 'text') return;

    if (client.getGuild(newMessage.guild.id, 'messageupdatelog') === 'true') {
        const guildSettings = client.getGuild(newMessage.guild.id);
        console.log(guildSettings);

        const messageChannel = client.getGuild(newMessage.guild.id);
        if (!messageChannel) return;
        if (oldMessage.cleanContent !== newMessage.cleanContent) {
            const embed = new MessageEmbed()
                .setAuthor([200,0,0])
                .setTimestamp()
                .setAuthor("Message updated!")
                .addField("Author", newMessage.author.tag)
                .addField("Channel", `#${newMessage.channel.name} (${newMessage.channel.id}`)
                .addField("MessageID", newMessage.id)
                .addField("Old message", oldMessage.cleanContent.length < 960 ? oldMessage.cleanContent : `${oldMessage.cleanContent.substring(0, 960)} ...`)
                .addField("New message", newMessage.cleanContent.length < 960 ? newMessage.cleanContent : `${newMessage.cleanContent.substring(0, 960)} ...`)
            messageChannel.send({
                embed: embed
            });
        }
    }
};