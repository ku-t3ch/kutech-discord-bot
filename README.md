# KU Tech Discord Bot

Discord bot for managing KU Tech discord server. Built with TypeScript and [discord.js](https://discord.js.org/)

## Setup

- Install pnpm if you don't have one installed, you can install using npm

```
npm install -g pnpm
```

Install dependencies

```
pnpm install
```

## Development

- Copy the `.env.example` to `.env`

```
cp .env.example .env
```

and set all variables

- Run the bot in development mode with watch mode

```
pnpm dev
```

## Deploy

- Run with Docker

```shell
# For persist data generate inside docker
docker volume create kutech-discord-bot-db
docker build . -t kutech-discord-bot
docker run -d --env-file=.env --name kutech-discord-bot --mount source=kutech-discord-bot-db,target=/app kutech-discord-bot
```

- Run with Node

```shell
pnpm install
pnpm build
pnpm start
```

docker run --env-file=.env --name kutech-discord-bot --mount source=kutech-discord-bot-db,target=/app kutech-discord-bot
