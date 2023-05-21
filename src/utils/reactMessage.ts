import { Message } from 'discord.js';

import isEmoji from './isEmoji';

export function reactMessage(message: Message, emoji: string) {
  if (isEmoji(emoji)) {
    message.react(emoji);
  } else {
    console.log('[ERROR] This is not emoji');
  }
}
