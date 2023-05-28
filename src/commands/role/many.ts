import { defineCommandHandler } from '../../types/command';
import { roleFormModal } from '../../utils/roleFormModal';

export default defineCommandHandler({
  data: {
    name: 'rolemany',
    description: 'User can pick multiple roles',
  },
  execute: async (client, interaction) => {
    try {
      const modal = roleFormModal('roleManyFormModal');

      await interaction.showModal(modal);
    } catch (error) {
      console.error(error);
    }
  },
});
