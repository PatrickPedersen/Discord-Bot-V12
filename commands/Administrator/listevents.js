const { MessageEmbed } = require("discord.js")


module.exports.run = (bot, message, args) => {
    const lang = {
        listevents_embed: "List of all events",
        listevents_modlog: "Logs all bans, unbans, kicks, warns, mutes, unmutes, softbans",
        listevents_messageupdate: "Logs all message updates on this Discord server",
        listevents_messagedelete: "Logs all deleted messages on this Discord server",
        listevents_channelupdate: "Logs all channel changes on this Discord server",
        listevents_channelcreate: "Logs all recently created channels on this Discord server",
        listevents_channeldelete: "Logs all recently deleted channels on this Discord server",
        listevents_presenceupdate: "Logs all presence updates of the members on this Discord server",
        listevents_rolecreate: "Logs all recently created roles on this Discord server",
        listevents_roledelete: "Logs all recently deleted roles on this Discord server",
        listevents_roleupdate: "Logs all changes of the roles on this Discord server",
        listevents_userjoin: "Logs all recently joined members on this Discord server",
        listevents_userleft: "Logs all recently left members on this Discord server",
        listevents_guildupdate: "Logs all changes of the server on this Discord server",
        listevents_memberupdate: "Logs all user changes on this Discord server",
        listevents_description: "Lists you all events that you can log on your server",
    }

    const eventslist = ['Modlog', 'Messagedelete', 'Messageupdate', 'Channelupdate', 'Channelcreate', 'Channeldelete', 'Memberupdate', 'Presenceupdate', 'Rolecreate', 'Roledelete', 'Roleupdate', 'Userjoin', 'Userleft', 'Guildupdate'];

    const embed = new MessageEmbed()
        .setColor([200,0,0])
        .setAuthor(lang.listevents_embed)

    for (let i = 0; i < eventslist.length; i += 1) {
        const x = eventslist[i].toLowerCase();
        embed.addField(eventslist[i], lang[`listevents_${x}`]);
    }

    message.channel.send({ embed });
};

module.exports.help = {
    name: 'listevents',
    aliases: [],
    description: 'Lists all events that you can log on the server',
    usage: "",
    category: "Administrator",
    guildOnly: true,
    args: false,
    accessableby: 'Administrator',
};