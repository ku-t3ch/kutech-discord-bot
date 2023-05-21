import { EmbedBuilder, Events } from 'discord.js';

import { keyv } from '../keyv';
import { defineEventHandler } from '../types/event';
import { RoleInput } from '../types/roleInput';

export default defineEventHandler({
  eventName: Events.InteractionCreate,
  execute: async (client, interaction) => {
    console.log('[DEBUG] Event handler called');
    if (interaction.isCommand()) {
      const commandName = interaction.commandName;
      const { commands } = client;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        console.log(
          `[Command] ${interaction.user?.tag} ${interaction.user?.id} > ${commandName}`
        );
        await command.execute(client, interaction);
      } catch (error) {
        console.error(error);
        await interaction.deleteReply();
      }
    } else if (interaction.isModalSubmit()) {
      if (interaction.customId === 'roleFormModal') {
        // Get the data entered by the user
        const messageInput =
          interaction.fields.getTextInputValue('messageInput');
        const roleInput = interaction.fields.getTextInputValue('roleInput');

        try {
          const roles: RoleInput[] = JSON.parse(roleInput);

          const description = roles
            .map((r) => r.emoji + ' ' + r.role)
            .join('\n');

          const embed = new EmbedBuilder()
            .setDescription(messageInput + '\n' + description)
            .setColor('Aqua');

          const message = await interaction.reply({
            embeds: [embed],
            fetchReply: true,
          });

          roles.forEach((role) => {
            message.react(role.emoji);
          });

          // store message id so that it can be used to assign roles based on the specific message only
          keyv.set(message.id, roleInput);
        } catch (error) {
          await interaction.reply({
            content: 'Error parsing JSON. Please provide a valid JSON data',
            ephemeral: true,
          });
          console.error(error);
        }
      }
    }
  },
});
