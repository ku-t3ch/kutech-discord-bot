import {
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  TextChannel,
  User,
} from 'discord.js';

import { Bot } from '../client';
import { keyv } from '../keyv';
import { RoleInput } from '../types/roleInput';

export async function manageRole(
  client: Bot,
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser,
  action: 'add' | 'remove'
) {
  if (!user.bot && reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Error fetching reaction:', error);
      return;
    }
  }

  if (
    !user.bot &&
    reaction.message.channel instanceof TextChannel &&
    reaction.message.author?.id === client.user?.id
  ) {
    const messageID = reaction.message.id;

    const storedRole = await keyv.get(messageID);

    if (!storedRole) return;

    const roleReactions: RoleInput[] | RoleInput = JSON.parse(storedRole);
    let selectedRole: RoleInput | undefined;

    if (roleReactions instanceof Array) {
      selectedRole = roleReactions.find((r) => r.emoji === reaction.emoji.name);
    } else {
      selectedRole = roleReactions;
    }

    if (selectedRole) {
      const guild = reaction.message.guild;
      const role = guild?.roles.cache.find(
        (r) => r.name === selectedRole?.role
      );
      const member = guild?.members.cache.get(user.id);

      if (!role) {
        console.log('Role not found.');
        return;
      }

      try {
        if (action === 'add') {
          await member?.roles.add(role);
        } else {
          await member?.roles.remove(role);
        }

        console.log(
          `[ROLE] ${action === 'add' ? 'Added' : 'Removed'} role ${
            role?.name
          } from user ${member?.user.tag}`
        );
      } catch (error) {
        console.error('Error removing role:', error);
      }
    }
  }
}
