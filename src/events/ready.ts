import { defineEventHandler } from '../types/event';

export default defineEventHandler({
  eventName: 'ready',
  once: true,
  execute: async (client) => {
    console.log(`[ready] Now online as ${client.user?.tag}`);

    const commands_data = [...client.commands.values()].map(
      (command) => command.data
    );

    try {
      // In development use guild command to get an update on command instantly,
      // but in production use application command so it can be used on another server
      if (process.env.NODE_ENV === 'production') {
        await client.application?.commands.set(commands_data);
        console.info(
          `[ready] ${client.commands.size} application commands registered`
        );
      } else {
        const guildId = process.env.GUILD_ID as string;
        const guild = client.guilds.cache.get(guildId);
        if (!guild) {
          throw new Error(`Guild ${guild} not found`);
        }
        await guild.commands.set(commands_data);
        console.info(
          `[ready] ${client.commands.size} guild commands registered on ${guild.name}`
        );
      }
    } catch (error) {
      console.error('[ready] Unable to set commands:', error);
    }
  },
});
