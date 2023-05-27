import {
  GuildMember,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User,
} from 'discord.js';

import { RoleInput } from '../types/roleInput';

// This didn't work if user reacted to message with multiple emoji at the same time, VERY FAST.
// Think this is the best it can be. CarlBot is also have the same effect as this.
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

  if (roleReactions instanceof Array) {
    roleReactions.forEach((role) => {
      if (previousRole?.find((r) => r.name === role.name)) {
        console.log(
          `[ROLE] ${user.tag} switch role from ${role.emoji} ${role.name} to ${selectedRole?.emoji} ${selectedRole?.name}`
        );
        return reaction.message.reactions
          .resolve(role.emoji)
          ?.users.remove(user.id);
      }
    });
  }
}
