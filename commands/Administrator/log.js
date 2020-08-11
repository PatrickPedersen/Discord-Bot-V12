const { prefix } = require("../../config.json");
const fs = require('fs')

module.exports.run = async (bot, message, args) => {

    let lang = {
        log_noinput: "You forgot to enter what event you want to have logged in the channel. You can get a list of all available events with %prefixlistevents",
        log_messagedeleteset: "All deleted messages are now logged in %channelname",
        log_messagedeletedeleted: "All deleted messages will no longer be logged!",
        log_messageupdateset: "All updated messages are now logged in %channelname",
        log_messageupdatedeleted: "All updated messages will no longer be logged!",
        log_channelupdateset: "All channel updates are now logged in %channelname",
        log_channelupdatedeleted: "All channel updates will no longer be logged!",
        log_memberupdateset: "All member updates are now logged in %channelname",
        log_memberupdatedeleted: "All member updates will no longer be logged!",
        log_channelcreateset: "All newly created channel are now logged in %channelname",
        log_channelcreatedeleted: "All newly created channel will no longer be logged!",
        log_channeldeleteset: "All newly deleted channel are now logged in %channelname",
        log_channeldeletedeleted: "All newly deleted channel will no longer be logged!",
        log_userjoinset: "Every user who joins the server will now be logged in %channelname",
        log_userjoindeleted: "Every user who joins the server will no longer be logged!",
        log_userleftset: "Every user who leaves the server will now be logged here in %channelname",
        log_userleftdeleted: "Every user who leaves the server will no longer be logged!",
        log_modlogset: "All moderative actions are now logged in %channelname",
        log_modlogdeleted: "All moderative actions will no longer be logged!",
        log_rolecreateset: "All newly created roles are now logged in %channelname",
        log_rolecreatedeleted: "All newly created roles will no longer be logged!",
        log_roledeleteset: "All newly deleted roles are now logged in %channelname",
        log_roledeletedeleted: "All newly deleted roles will no longer be logged!",
        log_roleupdateset: "All role updates are now logged in %channelname",
        log_roleupdatedeleted: "All role updates will no longer be logged!",
        log_presenceupdateset: "All member presence changes are now logged in %channelname",
        log_presenceupdatedeleted: "All member presence changes will no longer be logged!",
        log_guildupdateset: "All server updates are now logged in %channelname",
        log_guildupdatedeleted: "All server updates will no longer be logged!",
        log_chatfilterset: "All messages deleted by the chatfilter are now logged in %channelname",
        log_chatfilterdeleted: "All messages deleted by the chatfilter will no longer be logged!",
        log_error: "That event doesn't exist. You can check all events that you can log with %prefixlistevents",
        log_description: "Allows you to log for different channels, different events. The command %prefixlistevents will give you a list of all events"
    }

    const validation = ['chatfilter', 'modlog', 'messagedelete', 'messageupdate', 'channelupdate', 'channelcreate', 'channeldelete', 'memberupdate', 'presenceupdate', 'userjoin', 'userleft', 'rolecreate', 'roledelete', 'roleupdate', 'guildupdate'];
    const content = args.slice().join(' ');
    const margs = message.content.split(' ');

    const noinput = lang.log_noinput.replace('%prefix', prefix);
    if (!content) return message.channel.send(noinput);

    for (let i = 0; i < margs.length; i += 1) {
        if (validation.indexOf(margs[i].toLowerCase()) >= 0) {
            if (margs[1].toLowerCase() === 'messagedelete') {
                if (message.client.config.messagedellog === false) {
                    margs[2] = bot.config.messagedellogchannel;
                    bot.config.messagedellog = true;


                    const messagedeleteset = lang.log_messagedeleteset.replace('%channelname', `**#${message.channel.name}**`);
                    return message.channel.send(messagedeleteset);
                }
                bot.config.messagedellog = false;

                return message.channel.send(lang.log_messagedeletedeleted);
            }
            if (margs[1].toLowerCase() === 'messageupdate') {
                if (message.client.config.messageupdatelog === false) {
                    margs[2] = bot.config.messageupdatelogchannel;
                    bot.config.messageupdatelog = true;

                    const messageupdateset = lang.log_messageupdateset.replace('%channelname', `**#${message.channel.name}**`);
                    return message.channel.send(messageupdateset);
                }
                bot.config.messagedellog = false;

                return message.channel.send(lang.log_messageupdatedeleted);
            }
            if (margs[1].toLowerCase() === 'channelupdate') {
                if (message.client.config.channelupdatelog === false) {
                    margs[2] = bot.config.channelupdatelogchannel;
                    bot.config.channelupdatelog = true;

                    const channelupdateset = lang.log_channelupdateset.replace('%channelname', `**#${message.channel.name}**`);
                    return message.channel.send(channelupdateset);
                }
                bot.config.channelupdatelog = false;

                return message.channel.send(lang.log_channelupdatedeleted);
            }
            if (margs[1].toLowerCase() === 'memberupdate') {
                if (message.client.config.guildmemberupdatelog === false) {
                    margs[2] = bot.config.guildmemberupdatelogchannel;
                    bot.config.guildmemberupdatelog = true;

                    const memberupdateset = lang.log_memberupdateset.replace('%channelname', `**#${message.channel.name}**`);
                    return message.channel.send(memberupdateset);
                }
                bot.config.guildmemberupdatelog = false;

                return message.channel.send(lang.log_memberupdatedeleted);
            }
        }
    }

};

module.exports.help = {
    name: 'log',
    aliases: [],
    description: `Allows you to log for different channels and events. Use ${prefix}listevents to get a list of all events`,
    usage: "(name of the event)",
    category: "Administrator",
    guildOnly: true,
    args: true,
    accessableby: 'Administrator',
};