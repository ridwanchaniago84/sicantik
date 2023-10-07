import { ContextMenuCommandBuilder, ApplicationCommandType } from 'discord.js';

const convertImageCommand = new ContextMenuCommandBuilder()
    .setName('Convert Image To Text')
    .setType(ApplicationCommandType.Message);

export default convertImageCommand.toJSON();
