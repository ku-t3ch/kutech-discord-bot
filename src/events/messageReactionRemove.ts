import { Events, TextChannel } from 'discord.js';

import { keyv } from '../keyv';
import { defineEventHandler } from '../types/event';
import { RoleInput } from '../types/roleInput';

export default defineEventHandler({
  eventName: Events.MessageReactionRemove,
  execute: async (client, reaction, user) => {
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

      const roleReactions: RoleInput[] = JSON.parse(storedRole);

      const selectedRole = roleReactions.find(
        (r) => r.emoji === reaction.emoji.name
      );

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
          await member?.roles.remove(role);
          console.log(
            `[ROLE] Removed role ${role?.name} from user ${member?.user.tag}`
          );
        } catch (error) {
          console.error('Error removing role:', error);
        }
      }
    }
  },
});
