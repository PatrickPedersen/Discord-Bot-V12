const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
    DISABLED: 'off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydney: 'Sydney',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};

module.exports.run = (bot, message, args) => {
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;

    let Embed = new MessageEmbed()
        .setDescription(`**Guild information for __${message.guild.name}__**`)
        .setColor([200,0,0])
        .setThumbnail(message.guild.iconURL({ dynamic: true}))
        .addField('General', [
            `**❯ Name:** ${message.guild.name}`,
            `**❯ ID:** ${message.guild.id}`,
            `**❯ Owner:** ${message.guild.owner.user.tag} | ID: ${message.guild.ownerID}`,
            `**❯ Region:** ${regions[message.guild.region]}`,
            `**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
            `**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
            `**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
            `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
            '\u200B'
        ], true)
        .addField('Statistics', [
            `**❯ Role Count:** ${roles.length}`,
            `**❯ Emoji Count:** ${emojis.size}`,
            `**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
            `**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
            `**❯ Member Count:** ${message.guild.memberCount}`,
            `**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
            `**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
            `**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
            `**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
            `**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
            '\u200B'
        ], )
        .addField('Presence', [
            `**❯ Online:** ${members.filter(member => member.presence.status === 'online').size} | **Idle:** ${members.filter(member => member.presence.status === 'idle').size} | **Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size} | **Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
            '\u200B'
        ], )
        .addField(`Roles [${roles.length -1}]`, roles.length ? roles.join(', ') : 'None',true)
        .setTimestamp();

    return message.channel.send({ embed: Embed });
};

module.exports.help = {
    name: 'serverinfo',
    aliases: ["si","serverdesc","server","guild","guildinfo"],
    description: 'Displays info about the guild!',
    usage: "",
    category: "Misc",
    guildOnly: true,
    args: false,
    accessableby: 'Member',
};