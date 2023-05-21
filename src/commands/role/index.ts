import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

import { defineCommandHandler } from '../../types/command';

export default defineCommandHandler({
  data: {
    name: 'role',
    description: 'Make a bot add message to give roles',
  },
  execute: async (client, interaction) => {
    try {
      // Create the modal
      const modal = new ModalBuilder()
        .setCustomId('roleFormModal')
        .setTitle('Set a role to give to user');

      // Create the text input components
      const messageInput = new TextInputBuilder()
        .setCustomId('messageInput')
        // The label is the prompt the user sees for this input
        .setLabel('Message')
        // Short means only a single line of text
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const roleInput = new TextInputBuilder()
        .setCustomId('roleInput')
        .setLabel('Roles')
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setPlaceholder(`A JSON format with emoji and role as a key`);

      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(messageInput);
      const secondActionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(roleInput);

      // Add inputs to the modal
      modal.addComponents(firstActionRow, secondActionRow);

      await interaction.showModal(modal);
    } catch (error) {
      console.error(error);
    }
  },
});
