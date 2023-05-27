import {
  GuildMember,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User,
} from 'discord.js';

import { RoleInput } from '../types/roleInput';

export async function removeUserPreviousRoles(
  roleReactions: RoleInput | RoleInput[],
  selectedRole: RoleInput,
  member: GuildMember | undefined,
  user: User | PartialUser,
  reaction: MessageReaction | PartialMessageReaction
) {
  const previousRole = member?.roles.cache.filter((r) =>
    roleReactions instanceof Array
      ? roleReactions.find((rr) => rr.name == r.name)
      : roleReactions.name == r.name
  );

  if (previousRole) {
    // Find all previous roles of the user and remove roles and reactions
    previousRole.forEach(async (r) => {
      // Get the `RoleInput`
      const role =
        roleReactions instanceof Array
          ? roleReactions.find((rr) => rr.name == r.name)
          : roleReactions;

      if (role) {
        console.log(
          `[ROLE] ${user.tag} switch role from ${role.emoji} ${role.name} to ${selectedRole?.emoji} ${selectedRole?.name}`
        );
        // Remove user reactions
        reaction.message.reactions.resolve(role.emoji)?.users.remove(user.id);
        // Remove user roles
        await member?.roles.remove(r); // Remove existing roles
      }
    });
  }
}
