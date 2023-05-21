import { EmbedBuilder, Events, TextChannel } from 'discord.js';

import { keyv } from '../keyv';
import { defineEventHandler } from '../types/event';
import { RoleInput } from '../types/roleInput';
import isEmoji from '../utils/isEmoji';
import { reactMessage } from '../utils/reactMessage';

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
          const roles: RoleInput[] | RoleInput = JSON.parse(roleInput);

          let description: string;

          if (roles instanceof Array) {
            description = roles
              .map((r) => {
                if (isEmoji(r.emoji)) {
                  return r.emoji + ' ' + r.role;
                } else {
                  throw new Error('Invalid emoji provided');
                }
              })
              .join('\n');
          } else {
            description = roles.emoji + ' ' + roles.role;
          }

          const embed = new EmbedBuilder()
            .setDescription(messageInput + '\n' + description)
            .setColor('Aqua');

          const channel = client.channels.cache.get(
            process.env.ROLE_CHANNEL_ID as string
          );

          // if (!(channel instanceof TextChannel)) return;

          const message = await interaction.reply({
            embeds: [embed],
            fetchReply: true,
          });

          if (roles instanceof Array) {
            roles.forEach((role) => {
              reactMessage(message, role.emoji);
            });
          } else {
            reactMessage(message, roles.emoji);
          }

          // store message id so that it can be used to assign roles based on the specific message only
          keyv.set(message.id, roleInput);
        } catch (error) {
          await interaction.reply({
            content: 'Please provide a valid JSON and emoji',
            ephemeral: true,
          });
          console.error(error);
        }
      }
    }
  },
});
