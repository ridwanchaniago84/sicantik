require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const route = require('./src/Route/Main.Route').route;
const ResponseAI = require('./src/Controller/ResponseAI').ResponseAI;

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

bot.on('message', messages => {
    const AIName = [
        'tenshi', 'Tenshi'
    ];

    if (AIName.includes(messages.content))
        return messages.channel.send('Apa?');

    const splitTextVoice = messages.content.split(' ');
    let founded = false;
    
    splitTextVoice.map((message) => {
        let callingAI = AIName.find(name =>
            name === message
        );

        if (callingAI && !founded) {
            founded = true;
            ResponseAI({
                message: messages,
                content: messages.content
            });

            return;
        }
    });

    // Function Parameter

    if (!messages.content.startsWith(prefix)) return;

    const args = messages.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase();

    switch (cmd) {
        case 'download':
            if (args[1] && args[2]) {
                route({
                    command: cmd,
                    message: messages,
                    type: args[1],
                    url: args[2]
                });
            }

            break;
        case 'list':
            let folder = '';

            if (args[1]) {
                folder = messages.content.substr(messages.content.indexOf(" ") + 1);
            }

            route({
                command: cmd,
                message: messages,
                folder: folder ? folder : ''
            });
            break;
        default:
            messages.channel.send('Command not found');
    }
});
