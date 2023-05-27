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
      const titleInput = new TextInputBuilder()
        .setCustomId('titleInput')
        .setLabel('Title')
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

      const descriptionInput = new TextInputBuilder()
        .setCustomId('descriptionInput')
        .setLabel('Description')
        .setRequired(false)
        .setStyle(TextInputStyle.Paragraph);

      const roleInput = new TextInputBuilder()
        .setCustomId('roleInput')
        .setLabel('Roles')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setPlaceholder(`A JSON format with emoji and role as a key`);

      // Add inputs to the modal
      modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          descriptionInput
        ),
        new ActionRowBuilder<TextInputBuilder>().addComponents(roleInput)
      );

      await interaction.showModal(modal);
    } catch (error) {
      console.error(error);
    }
  },
});
