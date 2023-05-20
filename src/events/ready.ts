import { defineEventHandler } from '../types/event';

export default defineEventHandler({
  eventName: 'ready',
  once: true,
  execute: async (client) => {
    console.log(`[ready] Now online as ${client.user?.tag}`);

    const commands_data = [...client.commands.values()].map(
      (command) => command.data
    );

    // Set guild commands
    const guildId = process.env.GUILD_ID as string;

    try {
      const guild = client.guilds.cache.get(guildId);
      if (!guild) {
        throw new Error(`Guild ${guild} not found`);
      }
      await guild.commands.set(commands_data);
      console.info(
        `[ready] ${client.commands.size} guild commands registered on ${guild.name}`
      );
    } catch (error) {
      console.error('[ready] Unable to set guild commands:', error);
    }
  },
});
