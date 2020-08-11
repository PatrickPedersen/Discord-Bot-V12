const mongoose = require('mongoose');


const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: String,

    modlog: Boolean,
    modlogchannel: String,
    messagedellog: Boolean,
    messagedellogchannel: String,
    messageupdatelog: Boolean,
    messageupdatelogchannel: String,
    channelupdatelog: Boolean,
    channelupdatelogchannel: String,
    channelcreatelog: Boolean,
    channelcreatelogchannel: String,
    channeldeletelog: Boolean,
    channeldeletelogchannel: String,
    guildmemberupdatelog: Boolean,
    guildmemberupdatelogchannel: String,
    welcomelog: Boolean,
    welcomelogchannel: String,
    guildupdatelog: String,
    guildupdatelogchannel: String,
    byelog: Boolean,
    byelogchannel: String,
    rolecreatelog: Boolean,
    rolecratelogchannel: String,
    roledeletelog: Boolean,
    roledeletelogchannel: String,
    roleupdatelog: Boolean,
    roleupdatelogchannel: String,

    welcome: Boolean,
    welcomechannel: String,
    welcomemsg: String,

    bye: Boolean,
    byechannel: String,
    byemsg: String,

    announce: Boolean,
    announcechannel: String,

    selfassignableroles: []
});

module.exports = mongoose.model('Guild', guildSchema);