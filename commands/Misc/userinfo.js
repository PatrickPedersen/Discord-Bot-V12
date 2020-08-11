const { MessageEmbed } = require('discord.js');
const { utc } = require('moment');

module.exports.run = (bot, message, args) => {

    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first()
        || message.guild.members.cache.get(userArgs[0])
        || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ")
        || x.user.username === userArgs[0])
        || message.member;

    let role = member.roles.cache
        .filter(r => r.id !== message.guild.id)
        .map(r => r)
        .join(" ") || "None";

    const flags = {
        DISCORD_EMPLOYEE: 'Discord Employee',
        DISCORD_PARTNER: 'Discord Partner',
        BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
        BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
        HYPESQUAD_EVENTS: 'HypeSquad Events',
        HOUSE_BRAVERY: 'House of Bravery',
        HOUSE_BRILLIANCE: 'House of Brilliance',
        HOUSE_BALANCE: 'House of Balance',
        EARLY_SUPPORTER: 'Early Supporter',
        TEAM_USER: 'Team User',
        SYSTEM: 'System',
        VERIFIED_BOT: 'Verified Bot',
        VERIFIED_DEVELOPER: 'Verified Bot Developer'
    };

    let keyPermissions = [];
    if (member.permissions.has('KICK_MEMBERS')) keyPermissions.push('Kick Members');
    if (member.permissions.has('BAN_MEMBERS')) keyPermissions.push('Ban Members');
    if (member.permissions.has('ADMINISTRATOR')) keyPermissions.push('Administrator');
    if (member.permissions.has('MANAGE_CHANNELS')) keyPermissions.push('Manage Channels');
    if (member.permissions.has('MANAGE_GUILD')) keyPermissions.push('Manage Server');
    if (member.permissions.has('MANAGE_MESSAGES')) keyPermissions.push('Manage Messages');
    if (member.permissions.has('MENTION_EVERYONE')) keyPermissions.push('Mention Everyone');
    if (member.permissions.has('MANAGE_NICKNAMES')) keyPermissions.push('Manage Nicknames');
    if (member.permissions.has('MANAGE_ROLES')) keyPermissions.push('Manage Roles');
    if (member.permissions.has('MANAGE_WEBHOOKS')) keyPermissions.push('Manage Webhooks');
    if (member.permissions.has('MANAGE_EMOJIS')) keyPermissions.push('Manage Emojis');

    let acknowledge;
    if (member.permissions.has('MANAGE_ROLES')) acknowledge = "Server Moderator";
    if (member.permissions.has('ADMINISTRATOR')) acknowledge = "Server Admin";
    if (member.user.id === message.guild.ownerID) acknowledge = "Server Owner";

    let botCreator;
    if (member.user.id === bot.config.creatorId) {botCreator = ", **Bot Creator**"} else {botCreator = undefined}


    const memberAvatar = member.user.displayAvatarURL();
    let embed = new MessageEmbed()
        .setColor([200, 0, 0])
        .setThumbnail(memberAvatar)
        .setAuthor(`${member.user.tag}`, memberAvatar)

        .addField(
            `**Member Information:**`,
            `**Display Name: **\n <@${member.user.id}>
            **Joined at:**\n ${utc(member.joinedTimestamp).format('Do MMMM YYYY HH:mm:ss')}`, true)
        .addField(
            `**User Information:**`,
            `**ID:** ${member.user.id}
            **Discord Tag:** ${member.user.discriminator}
            **Created at:**\n ${utc(member.user.createdAt).format('Do MMMM YYYY HH:mm:ss')}`, true);

    const userFlags = member.user.flags.toArray();
    if (userFlags.length >= 1)
        embed.addField(`**Flags: **`,userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None', false);

        embed.addField(`**Roles [${member.roles.cache.size-1}]:**`, role, false);
    if (keyPermissions.length >= 1)
        embed.addField(`**Key Permissions:**`, keyPermissions.length >= 1 ? keyPermissions.join(", ") : "None", false);

    if (member.user.id == bot.config.developers)
        embed.setTitle(`**Bot Team:** Developer`);

    if (acknowledge !== undefined)
        embed.addField(`**Acknowledgements:**`, `${acknowledge}${botCreator !== undefined ? botCreator : ""}`, false);

        embed.setFooter(member.displayName, memberAvatar);
        embed.setTimestamp();

    if (member.user.presence.activities && member.user.presence.activities.join(", ") !== "")
        embed.addField('**Currently Playing**', `**Name:** ${member.user.presence.activities.join(", ")}`);
    return message.channel.send({ embed: embed });
};

module.exports.help = {
    name: 'userinfo',
    aliases: ["ui","userdesc","whois"],
    description: 'Displays info about the user!',
    usage: "(User)",
    category: "Misc",
    guildOnly: true,
    args: false,
    accessableby: 'Member',
};