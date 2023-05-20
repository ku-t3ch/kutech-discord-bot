import {
  ApplicationCommandData,
  Awaitable,
  CommandInteraction,
} from 'discord.js';

import { Bot } from '../client';

export function defineCommandHandler(config: CommandHandlerConfig) {
  return config;
}

export type CommandHandlerExecutor = (
  client: Bot,
  interaction: CommandInteraction
) => Awaitable<void>;

export interface CommandHandlerConfig {
  data: ApplicationCommandData;
  ephemeral?: boolean;
  execute: CommandHandlerExecutor;
}
