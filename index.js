const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = 'NTU5MjEzMjMzNDA0Mzc5MTU2.XJb16A.bdsi3gJZ24jCr8iJOjTa3xOcP7A';
const route = require('./src/Route/Main.Route').route;

bot.login(TOKEN);

const prefix = 'ア';

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    bot.user.setPresence({
        status: 'online'
    });

    bot.user.setActivity("Ojou", {
        type: "STREAMING",
        url: 'https://www.youtube.com/watch?v=QxD8bQrVLpk'
    });
});

bot.on('message', message => {
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    switch (cmd)
    {
        case 'download':
            if (args[1] && args[2])  {
                route({
                    command: cmd,
                    message: message,
                    type: args[1],
                    url: args[2]
                });
            }

            break;
        case 'list':
            let folder = '';

            if (args[1]) {
                folder = message.content.substr(message.content.indexOf(" ") + 1);
            }

            route({
                command: cmd,
                message: message,
                folder: folder ? folder : ''
            });
            break;
        default:
            message.channel.send('Command not found');
    }
});
