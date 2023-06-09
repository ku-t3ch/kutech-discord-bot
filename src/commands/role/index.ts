import { defineCommandHandler } from '../../types/command';
import { roleFormModal } from '../../utils/roleFormModal';

export default defineCommandHandler({
  data: {
    name: 'role',
    description: 'User can pick only one role',
  },
  execute: async (client, interaction) => {
    try {
      const modal = roleFormModal('roleFormModal');

      await interaction.showModal(modal);
    } catch (error) {
      console.error(error);
    }
  },
});
