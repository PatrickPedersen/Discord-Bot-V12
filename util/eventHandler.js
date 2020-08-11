const reqEvent = (event) => require(`../events/${event}`);

module.exports = client => {
    client.on("ready", function() {reqEvent("ready") (client)});
    client.on("messageUpdate", function(oldMessage, newMessage) {reqEvent("messageUpdate") (client, oldMessage, newMessage)});
    client.on('guildCreate', function(guild) {reqEvent("guildCreate") (guild, client)});
};