# -------------------------
# Deps: Install all dependencies
# -------------------------

FROM node:18-alpine AS dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npx pnpm i

# -------------------------
# Build: Build the project
# -------------------------

FROM node:18-alpine AS build

WORKDIR /app 

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN npx pnpm build 

# removes devDependencies
RUN npx pnpm prune --prod


# -------------------------
# Deploy: Run the application
# -------------------------

FROM node:18-alpine AS deploy

LABEL name "kutech-discord-bot"

WORKDIR /app 

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/.env ./.env

CMD ["node", "dist/client.js"]