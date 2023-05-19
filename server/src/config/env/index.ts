import 'dotenv/config'
import { z } from 'zod'

const environmentFromSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  JWT_KEY_SECRET: z.string(),
})

const _environment = environmentFromSchema.safeParse(process.env)

if (_environment.success === false) {
  console.error('Invalid environment variables', _environment.error.format())
  throw new Error('Invalid environment variables')
}

export const environment = _environment.data
