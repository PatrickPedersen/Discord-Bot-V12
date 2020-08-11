const { MessageEmbed } = require('discord.js');

lang = {
    clear_embedtitle: "%amount messages cleared by %user",
    messagesdeleted: "%messagecount messages have been successfully deleted!",

}

module.exports.run = async (bot, message, args) => {
    if (args.slice().length === 0) return message.reply("You forgot to specify how many messages you want to delete");
    if (isNaN(args.slice(0, 1).join(' '))) return message.reply("The number of messages you want to delete have to be a number!");

    const messageCount = parseInt(args.slice(0, 1).join(' '), 10);
    if (messageCount > 100) return message.reply("You can only delete 100 messages at once!");
    if (messageCount < 2) return message.reply("You must delete at least 2 messages!");

    const reason = args.slice(1);
    if (!reason || !reason.length) return message.reply("You forgot to specify why you want to delete these messages!");

    await message.channel.messages.fetch({ limit: messageCount }).then(async (messages) => {
        await message.channel.bulkDelete(messages);

        const embedtitle = lang.clear_embedtitle.replace('%amount', messageCount).replace('%user', `${message.author.username}${message.author.discriminator}`);
        const modLogEmbed = new MessageEmbed()
            .setAuthor(embedtitle, message.author.displayAvatarURL())
            .setColor([200,0,0])
            .setTimestamp()
            .addField("Reason:", reason.join(" "));

        let sChannel = message.guild.channels.cache.find(s => s.name === "serverlog");
        if (!sChannel)
            return message.channel.send("Please create serverlog channel");

        sChannel.send({ embed: modLogEmbed });

        const messagesdeleted = lang.messagesdeleted.replace('%messagecount', messageCount);
        const messageclearembed = new MessageEmbed()
            .setColor([200,0,0])
            .setDescription(`✅ ${messagesdeleted}`);
        return message.channel.send({ embed: messageclearembed }).then((message) => {
            setTimeout(async () => {
                if (await message.channel.messages.fetch(message.id)) {
                    message.delete();
                }
            }, 10000);
        });
    }).catch((error) => {
        if (error.message === 'You can only bulk delete messages that are under 14 days old.') return message.reply("You can only delete messages that are under 14 days old");
        return message.reply("There was an error. Could not delete the messages. Please check if the bot has the necessary permission to execute this action!");
    });
};

module.exports.help = {
    name: 'clear',
    aliases: ["purge"],
    description: 'Deletes the last X messages that were sent in the current channel',
    usage: "(Amount of messages) (Reason)",
    category: "Moderator",
    guildOnly: true,
    args: true,
    accessableby: 'Moderator',
};