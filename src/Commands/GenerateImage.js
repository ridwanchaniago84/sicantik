import { SlashCommandBuilder } from 'discord.js';

const generateImage = new SlashCommandBuilder()
    .setName('generateimage')
    .setDescription('Generate image with promp')
    .addStringOption(option =>
        option.setName('promp')
            .setDescription('Promp Image')
            .setRequired(true)
    );

export default generateImage.toJSON();
