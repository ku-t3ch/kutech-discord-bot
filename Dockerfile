FROM node:18-alpine 

WORKDIR /usr/src/app 

COPY package.json pnpm-lock.yaml ./

RUN npx pnpm i

COPY . .

RUN npx pnpm build 

CMD ["node", "dist/client.js"]