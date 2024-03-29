import { SlashCommandBuilder } from 'discord.js';

const changeTokenDiscordCommand = new SlashCommandBuilder()
    .setName('changetokendiscord')
    .setDescription('Change token discord for scratch.')
    .addStringOption(option =>
        option.setName('token')
            .setDescription('Promp Auth')
            .setRequired(true)
    );

export default changeTokenDiscordCommand.toJSON();