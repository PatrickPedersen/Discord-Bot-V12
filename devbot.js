const { Client, Collection } = require('discord.js');
const chalk = require('chalk');
const { readdirSync, readdir } = require('fs');
const { sep } = require('path');
const config = require('./config.json');

const bot = new Client();
bot.config = config;

["commands", "aliases"].forEach(x => bot[x] = new Collection());

// A function to load all the commands.
const load = (dir = "./commands/") => {

    readdirSync(dir).forEach(dirs => {
        // we read the commands directory for sub folders and filter the files with name with extension .js
        const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));

        // we use for loop in order to get all the commands in sub directory
        for (const file of commands) {
            // We make a pull to that file so we can add it the bot.commands collection
            const pull = require(`${dir}/${dirs}/${file}`);
            // we check here if the command name or command category is a string or not or check if they exist
            if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
                if (bot.commands.get(pull.help.name)) return console.warn(chalk.yellow(`WARNING >> `) + `Two or more commands have the same name ${pull.help.name}.`);
                // we add the the command to the collection, Map.prototype.set() for more info
                bot.commands.set(pull.help.name, pull);
                // we log if the command was loaded.
                console.log(chalk.green(`SUCCES >> `) + `Loaded command ${pull.help.name}.`);

            }
            else {
                // we check if the command is loaded else throw a error saying there was command it didn't load
                console.log(chalk.red(`ERROR >> `) + `Error loading command in ${dir}${dirs}. you have a missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`);
                // we use continue to load other commands or else it will stop here
                continue;
            }
            // we check if the command has aliases, is so we add it to the collection
            if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
                pull.help.aliases.forEach(alias => {
                    // we check if there is a conflict with any other aliases which have same name
                    if (bot.aliases.get(alias)) return console.warn(chalk.yellow(`WARNING >> `) + `Two commands or more commands have the same aliases: ${alias}`);
                    bot.aliases.set(alias, pull.help.name);
                });
            }
        }

    });
};

// we call the function to all the commands.
load();

require("./util/eventHandler")(bot);
require("./util/clientFunctions")(bot);
bot.mongoose = require("./util/mongoose");

bot.on("message", async message => {

    const prefix = bot.config.defaultSettings.prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let command;

    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;

    if (cmd.length === 0) return;
    if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
    else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

    if (command.help.accessableby === "Owner" && message.author.id != bot.config.creatorId) return message.channel.send("This command is only for the owner of the bot!");
    if (command.help.accessableby === "Developer" && message.author.id != bot.config.developers) return message.channel.send("This command is only for Developers!");
    if (command.help.accessableby === 'Administrator' && (!message.member.permissions.has("ADMINISTRATOR") || !message.member.guild.ownerID)) return message.channel.send("You don't have Administrator access!");

    if (command.help.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.help.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    if (command) command.run(bot, message, args);
});

require('dotenv').config({ path: '.env'});

bot.mongoose.init();
bot.login(process.env.TOKEN);

exports.bot = bot;