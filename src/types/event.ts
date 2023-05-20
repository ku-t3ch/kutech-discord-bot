import { Awaitable, ClientEvents } from 'discord.js';

import { Bot } from '../client';

export type EventHandlerExecutor<K extends keyof ClientEvents> = (
  ...args: [client: Bot, ...args: ClientEvents[K]]
) => Awaitable<void>;

export interface EventHandlerConfig<
  K extends keyof ClientEvents = keyof ClientEvents
> {
  eventName: K;
  execute: EventHandlerExecutor<K>;
  once?: boolean;
}

export function defineEventHandler<K extends keyof ClientEvents>(
  config: EventHandlerConfig<K>
): EventHandlerConfig<K> {
  return config;
}
