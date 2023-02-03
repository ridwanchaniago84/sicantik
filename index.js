import { config } from 'dotenv';
import {
    ActionRowBuilder,
    Client,
    GatewayIntentBits,
    InteractionType,
    ModalBuilder,
    Routes,
    TextInputBuilder,
    TextInputStyle
} from 'discord.js';
import { REST } from '@discordjs/rest';

// import downloadCommand from './src/Commands/Download.js';
import changeTokenDiscordCommand from './src/Commands/Discord.js';
import messageCommand from './src/Commands/Message.js';
import generateImage from './src/Commands/GenerateImage.js';

import download from './src/Controller/Download.js';
import imageOpenAI from './src/Controller/Image.js';
import { changeToken } from './src/Controller/Discord.js';

config();

const TOKEN = process.env.TOKEN;
// import { route } from './src/Route/Main.Route';
import ResponseAI from './src/Controller/ResponseAI.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`)

    client.user.setActivity("٩(๑`^´๑)۶", {
        type: 1,
        url: 'https://www.youtube.com/watch?v=7Hq-8iRwyOE'
    });
});

client.on('messageCreate', (messages) => {
    if (messages.author.id == process.env.ClientId)
        return;

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
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.type === InteractionType.ModalSubmit) {
        if (interaction.customId === 'downloadModal') {
            const downloadFile = download(interaction.fields.getTextInputValue('magnet'));

            interaction.reply({
                content: downloadFile,
            });
        }

        return;
    }


    if (interaction.commandName === 'generateimage') {
        interaction.reply({
            content: "Tunggu sebentar ya :)"
        });

        const response = await imageOpenAI(interaction.options.getString('promp'));

        interaction.editReply({
            content: response
        });

        return;
    }

    if (interaction.commandName === 'changeTokenDiscord') {
        interaction.reply({
            content: "Tunggu sebentar ya :)"
        });

        const response = await changeToken(interaction.options.getString('token'));

        interaction.editReply({
            content: response
        });

        return;
    }

    if (interaction.commandName === 'download') {
        const modal = new ModalBuilder()
            .setTitle('Download Torrent')
            .setCustomId('downloadModal')
            .setComponents(
                new ActionRowBuilder().setComponents(
                    new TextInputBuilder()
                        .setLabel('Magnet')
                        .setCustomId('magnet')
                        .setStyle(TextInputStyle.Paragraph)
                )
            );

        interaction.showModal(modal);
        return
    }

    if (interaction.commandName === 'Get Message Attachment URL') {
        try {
            const msgContent = await interaction.channel.messages.fetch(interaction.targetId);

            const msgCollection = [...msgContent.attachments][0];

            interaction.reply({
                content: msgCollection[1].attachment,
            });
        } catch (err) {
            interaction.reply({
                content: 'Pesan bukan lampiran!'
            });
        }

        return;
    }
});

async function main() {
    const commands = [
        // downloadCommand,
        messageCommand,
        generateImage,
        changeTokenDiscordCommand
    ];
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(process.env.ClientId, process.env.GuildId), {
            body: commands,
        });
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}

main();

// bot.login(TOKEN);
// const prefix = 'ア';

// bot.on('ready', () => {
//     console.info(`Logged in as ${bot.user.tag}!`);
//     bot.user.setPresence({
//         status: 'online'
//     });

//     bot.user.setActivity("٩(๑`^´๑)۶", {
//         type: "STREAMING",
//         url: 'https://www.youtube.com/watch?v=7Hq-8iRwyOE'
//     });
// });

// bot.on('message', messages => {
//     const AIName = [
//         'tenshi', 'Tenshi'
//     ];

//     if (AIName.includes(messages.content))
//         return messages.channel.send('Apa?');

//     const splitTextVoice = messages.content.split(' ');
//     let founded = false;

//     splitTextVoice.map((message) => {
//         let callingAI = AIName.find(name =>
//             name === message
//         );

//         if (callingAI && !founded) {
//             founded = true;
//             ResponseAI({
//                 message: messages,
//                 content: messages.content
//             });

//             return;
//         }
//     });

//     // Function Parameter

//     if (!messages.content.startsWith(prefix)) return;

//     const args = messages.content.trim().split(/ +/g);
//     const cmd = args[0].slice(prefix.length).toLowerCase();

//     switch (cmd) {
//         case 'download':
//             if (args[1] && args[2]) {
//                 route({
//                     command: cmd,
//                     message: messages,
//                     type: args[1],
//                     url: args[2]
//                 });
//             }

//             break;
//         case 'list':
//             let folder = '';

//             if (args[1]) {
//                 folder = messages.content.substr(messages.content.indexOf(" ") + 1);
//             }

//             route({
//                 command: cmd,
//                 message: messages,
//                 folder: folder ? folder : ''
//             });
//             break;
//         default:
//             messages.channel.send('Command not found');
//     }
// });
