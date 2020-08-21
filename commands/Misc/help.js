const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports.run = (bot, message, args) => {

    const avatarUrl = message.client.user.avatarURL();
    const authorAvatar = message.author.displayAvatarURL();

    const embed = new MessageEmbed()
        .setColor([200,0,0])
        .setAuthor(`${bot.user.username} Help`, message.guild.iconURL)
        .setFooter(`Requested by ${message.author.tag}`, authorAvatar)
        .setThumbnail(avatarUrl)
        .setTimestamp();
    if (args[0]) {
        let command = args[0];
        let cmd;
        if (bot.commands.has(command)) {
            cmd = bot.commands.get(command);
        }
        else if (bot.aliases.has(command)) {
            cmd = bot.commands.get(bot.aliases.get(command));
        }
        if(!cmd) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${bot.config.defaultSettings.prefix}help\` for the list of the commands.`));
        if (cmd.help.category === "Developer" && message.author.id != bot.config.developers) return message.channel.send(embed.setTitle("Denied").setDescription("Your not a developer."));

        command = cmd.help;
        embed.setTitle(`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)} command help`);
        embed.setDescription([
            `❯ **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`,
            `❯ **Description:** ${command.description || "No Description provided."}`,
            `❯ **Usage:** ${command.usage ? `\`${bot.config.defaultSettings.prefix}${command.name} ${command.usage}\`` : "No Usage"} `,
            `❯ **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None"}`,
            `❯ **Category:** ${command.category ? command.category : "General" || "Misc"}`,
            `❯ **Guild Only:** ${command.guildOnly ? "True" : "False"}`,
            `❯ **Arguments required:** ${command.args ? "True" : "False"}`,
            `❯ **Accessable by:** ${command.accessableby ? command.accessableby : "Members" || "Developers"}`,
        ].join("\n"));

        return message.channel.send(embed);
    }

    embed.setDescription([
        `Available commands for ${bot.user.username}.`,
        `The bot prefix is **${bot.config.defaultSettings.prefix}**`,
        "`<>`means needed and `()` it is optional but don't include those",
    ].join("\n"));

    let categories = readdirSync("./commands/");

    const sortingArray = [ 'Moderator', 'Administrator', 'Developer', 'Owner' ];

    categories.sort(function(a, b){
        return sortingArray.indexOf(b) - sortingArray.indexOf(a);
    });

    categories.forEach(category => {

        const dir = bot.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
        const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

        if (dir.size === 0) return;

        if (category === "Owner" && message.author.id === bot.config.creatorId) {
            embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "))
        }

        if (category === "Developer" && bot.config.developers.includes(message.author.id)) {
            embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "))
        }

        if (category === "Administrator" && (message.member.permissions.has("ADMINISTRATOR"))) {
            embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "))
        }

        if (category === "Moderator" && (message.member.permissions.has("MANAGE_ROLES"))) {
            embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "))
        }

        if (category != "Owner" && category != "Developer" && category != "Administrator" && category != "Moderator") {
            embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
        }

        /*try {

        }
        catch (e) {
            console.log(e);
        }*/


        /*try {

            //if (message.author.id === bot.config.creatorId) embed.addField(`❯ Owner`, dir.map(owner => `\`${owner.help.name}\``).join(", "))
            if (bot.config.developers.includes(message.author.id)) embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
            else if (category !== "Developer") embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
        }
        catch (e) {
            console.log(e);
        }*/

    });

    return message.channel.send(embed);
};

module.exports.help = {
    name: "help",
    aliases: ["h"],
    description: "Help command to show the commands",
    usage: "(command name)",
    category: "Misc",
    guildOnly: true,
    args: false,
    accessableby: "Members",
};