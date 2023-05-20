import { Events, TextChannel } from 'discord.js';

import { defineEventHandler } from '../types/event';

export default defineEventHandler({
  eventName: Events.MessageReactionAdd,
  execute: async (client, reaction, user) => {
    if (!user.bot && reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error('Error fetching reaction:', error);
        return;
      }
    }

    // Define your roles and emojis here
    const roleReactions = new Map<string, { emoji: string; role: string }[]>();

    roleReactions.set('1109615104447746078', [{ emoji: '✅', role: 'Member' }]);
    roleReactions.set('1109615438498889798', [
      { emoji: '✅', role: 'Moderator' },
    ]);

    if (
      !user.bot &&
      reaction.message.channel instanceof TextChannel &&
      reaction.message.author?.id === client.user?.id
    ) {
      const messageID = reaction.message.id;

      if (!roleReactions.has(messageID)) return;

      const selectedRole = roleReactions
        .get(messageID)!
        .find((r) => r.emoji === reaction.emoji.name);

      if (selectedRole) {
        const guild = reaction.message.guild;
        const role = guild?.roles.cache.find(
          (r) => r.name === selectedRole.role
        );
        const member = guild?.members.cache.get(user.id);

        if (!role) {
          console.log('Role not found.');
          return;
        }

        try {
          await member?.roles.add(role);
          console.log(`Added role ${role?.name} from user ${member?.user.tag}`);
        } catch (error) {
          console.error('Error removing role:', error);
        }
      }
    }
  },
});
