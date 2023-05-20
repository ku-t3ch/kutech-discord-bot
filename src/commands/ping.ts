import { defineCommandHandler } from '../types/command';

export default defineCommandHandler({
  data: {
    name: 'ping',
    description: 'replies with pong',
  },
  execute: async (_, interaction) => {
    console.log('[DEBUG] Ping command called.');
    await interaction.reply('Pong! 🏓');
  },
});
