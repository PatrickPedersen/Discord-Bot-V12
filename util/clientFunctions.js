const mongoose = require('mongoose');
const { Guild } = require('../models');

module.exports = client => {

    //Get a specific guilds data, from the DB
    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return client.config.defaultSettings;
    };

    //Update a specific guilds information in the DB
    client.updateGuild = async (guild, settings) => {

        let data = await client.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }

        console.log(`Guild "${data.guildName}" updated settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    //Create a new guild in the DB, without re-creating if it exists.
    client.createGuild = async settings => {

        const defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, client.config.defaultSettings);
        const merged = Object.assign(defaults, settings);

        const newGuild = await new Guild(merged);
        Guild.count({guildID: merged.guildID}, function (err, count) {
            if (count>0) {
                console.log(`Guild already exist in DB. "${merged.guildName}" (${merged.guildID})`)
            } else {
                return newGuild.save()
                    .then(console.log(`Default settings saved for guild "${merged.guildName}" (${merged.guildID})`));
            }
        });
    };

    //Clean our string when using Eval command.
    client.clean = text => {
        if (typeof(text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };


};

