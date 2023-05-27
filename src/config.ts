import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  BOT_TOKEN: z.string(),
  TEST_GUILD_ID: z.string().optional(),
  DATABASE_URL: z.string(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

export const ENV = envSchema.parse(process.env);
