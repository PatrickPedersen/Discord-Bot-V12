module.exports.run = (bot, message, args) => {
   if (message.author.id != bot.config.developers)
       return message.channel.send("You are not a developer!");
   message.channel.send('Shutting down...').then(m => {
       process.exit();
   });
};

module.exports.help = {
    name: 'shutdown',
    aliases: ["botstop"],
    description: 'Shuts down bot!',
    usage: "",
    category: "Developer",
    guildOnly: true,
    args: false,
    accessableby: 'Developer',
};