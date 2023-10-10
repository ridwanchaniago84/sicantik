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
import cron from 'node-cron';
import axios from 'axios';
import fs from 'fs';
import Tesseract from 'tesseract.js';

// import downloadCommand from './src/Commands/Download.js';
import changeTokenDiscordCommand from './src/Commands/Discord.js';
import messageCommand from './src/Commands/Message.js';
import generateImage from './src/Commands/GenerateImage.js';
import convertImageCommand from './src/Commands/ImageToText.js';

import download from './src/Controller/Download.js';
import imageOpenAI from './src/Controller/Image.js';
import { changeToken, getData } from './src/Controller/Discord.js';

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

const getBackup = () => {
    axios.get(`${process.env.TenshiEndPoint}/api/brain-backup`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': process.env.Authorization
        }
    })
        .then((response) => {
            fs.writeFileSync('./backup.json', JSON.stringify(response.data));
        }).then(() => {
            client.channels.cache.get('1057969782181347408').send({
                files: [
                    './backup.json'
                ]
            });
        }).catch((error) => {
            console.log('Get backup error: ' + error);
        });;
}

cron.schedule('0 1 * * *', async () => {
    console.log('Start daily daily routine');
    const message = await getData();

    client.channels.cache.get('1057969782181347408').send(message);
    axios.get(`${process.env.TenshiEndPoint}/api/send-notification`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': process.env.Authorization
        }
    });
    getBackup();
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

    if (interaction.commandName === 'changetokendiscord') {
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

    if (interaction.commandName === 'Convert Image To Text') {
        try {
            await interaction.reply({
                content: "Tunggu sebentar ya :)"
            });

            const msgContent = await interaction.channel.messages.fetch(interaction.targetId);
            const msgCollection = [...msgContent.attachments][0];

            if (msgCollection[1].height == null) {
                interaction.editReply({
                    content: 'File bukan gambar'
                });

                return;
            }

            await Tesseract.recognize(
                msgCollection[1].attachment,
                'eng+ind',
            ).then(({ data: { text } }) => {
                interaction.editReply({
                    content: "```" + text + "```"
                });
            }).catch(() => interaction.reply({
                content: 'Terjadi kesalahan.'
            }))
        } catch (err) {
            interaction.reply({
                content: 'Pesan bukan lampiran!'
            });
        }

        return;
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
        changeTokenDiscordCommand,
        convertImageCommand
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
