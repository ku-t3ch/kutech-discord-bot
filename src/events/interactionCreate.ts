import { Events } from 'discord.js';

import { defineEventHandler } from '../types/event';

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
    }
  },
});
