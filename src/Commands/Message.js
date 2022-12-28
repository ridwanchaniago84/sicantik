import { ContextMenuCommandBuilder, ApplicationCommandType } from 'discord.js';

const messageCommand = new ContextMenuCommandBuilder()
    .setName('Get Message Attachment URL')
    .setType(ApplicationCommandType.Message);

export default messageCommand.toJSON();
