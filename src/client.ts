import 'dotenv/config';

import { Client, Collection, IntentsBitField } from 'discord.js';

import commands from './commands';
import events from './events';
import { CommandHandlerConfig } from './types/command';
import { EventHandlerConfig } from './types/event';

const TOKEN = process.env.BOT_TOKEN as string;

export class Bot extends Client {
  commands: Collection<string, CommandHandlerConfig> = new Collection();

  constructor() {
    super({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
      ],
    });
  }

  async start() {
    this.registerModules();
    await this.login(TOKEN);
  }

  registerModules() {
    this.registerEvents(events as EventHandlerConfig[]);
    this.registerCommands(commands);
  }

  registerEvents(handlers: EventHandlerConfig[]) {
    console.info('[Handler] Setting up event handlers ...');

    for (const handler of handlers) {
      if (handler.once) {
        this.once(handler.eventName, (...args) =>
          handler.execute(this, ...args)
        );
      } else {
        this.on(handler.eventName, (...args) => handler.execute(this, ...args));
      }
    }
  }

  registerCommands(handlers: CommandHandlerConfig[]) {
    console.info('[Handler] Setting up command handlers ...');

    for (const handler of handlers) {
      this.commands.set(handler.data.name, handler);
    }
  }
}

const bot = new Bot();

bot.start();
