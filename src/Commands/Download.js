import { SlashCommandBuilder } from '@discordjs/builders';

const downloadCommand = new SlashCommandBuilder()
.setName('download')
.setDescription('Add torrent magnet');

export default downloadCommand.toJSON();
