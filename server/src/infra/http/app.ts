import fastify from 'fastify'
import fastifyCors from '@fastify/cors'

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
})

app.register(fastifyCors, {
  origin: true,
})
