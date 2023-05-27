import { z } from 'zod';

export const RoleInput = z.object({
  emoji: z.string().emoji(),
  name: z.string().min(1),
});

export const RoleInputs = z.union([z.array(RoleInput), RoleInput]);

export type RoleInput = z.infer<typeof RoleInput>;
