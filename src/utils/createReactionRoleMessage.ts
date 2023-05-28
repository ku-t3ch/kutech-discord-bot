import { EmbedBuilder, ModalSubmitInteraction } from 'discord.js';

import { prisma } from '../prisma';
import { RoleInputs } from '../types/roleInput';

import isEmoji from './isEmoji';
import { reactMessage } from './reactMessage';

export async function createReactionRoleMessage(
  interaction: ModalSubmitInteraction,
  allowMany = false
) {
  const titleInput = interaction.fields.getTextInputValue('titleInput');
  const descriptionInput =
    interaction.fields.getTextInputValue('descriptionInput');
  const roleInput = interaction.fields.getTextInputValue('roleInput');

  try {
    const roles = RoleInputs.parse(JSON.parse(roleInput));

    let roleDescription = '';

    if (roles instanceof Array) {
      roleDescription = roles
        .map((r) => {
          if (isEmoji(r.emoji)) {
            return r.emoji + ' ' + r.name;
          } else {
            throw new Error('Invalid emoji provided');
          }
        })
        .join('\n');
    } else {
      roleDescription = roles.emoji + ' ' + roles.name;
    }

    const embed = new EmbedBuilder().setColor('Aqua');

    if (titleInput) {
      embed.setTitle(titleInput);
    }

    if (descriptionInput) {
      embed.setDescription(descriptionInput + '\n\n' + roleDescription);
    } else {
      embed.setDescription(roleDescription);
    }

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
    await prisma.reactionRoleMessage.create({
      data: {
        messageId: message.id,
        data: JSON.stringify(roles),
        title: titleInput,
        description: descriptionInput,
        allowMany,
      },
    });
    console.log('[PRISMA] Reaction role message added to database');
  } catch (error) {
    await interaction.reply({
      content: 'Please provide a valid JSON and emoji',
      ephemeral: true,
    });
    console.error(error);
  }
}
