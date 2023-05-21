import { Events } from 'discord.js';

import { defineEventHandler } from '../types/event';
import { manageRole } from '../utils/manageRole';

export default defineEventHandler({
  eventName: Events.MessageReactionRemove,
  execute: async (client, reaction, user) => {
    manageRole(client, reaction, user, 'remove');
  },
});
