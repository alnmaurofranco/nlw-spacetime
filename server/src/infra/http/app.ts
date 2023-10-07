import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyJWT from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import { environment } from 'src/config/env'
import { AxiosClientAdapter } from '@infra/adapter/http/client/axios-client-adapter'
import { InMemoryUserRepository } from '@test/repository/database/in-memory/in-memory-user-repository'
import { AuthenticationByGithubUseCase } from '@domain/user/application/use-case/authentication-by-github/authentication-by-github-use-case'
import { resolve } from 'node:path'

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
})

app.register(fastifyMultipart)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(fastifyCors, {
  origin: true,
})
app.register(fastifyJWT, {
  secret: environment.JWT_KEY_SECRET,
})

app.post('/register', async (request) => {
  const axiosClientAdapter = new AxiosClientAdapter(null)
  const userRepository = new InMemoryUserRepository()
  const authenticationByGithub = new AuthenticationByGithubUseCase(
    userRepository,
    axiosClientAdapter,
  )
  const { code } = request.body as { code: string }
  const { user } = await authenticationByGithub.execute({ code })
  const token = app.jwt.sign(
    {
      name: user.name,
      avatarUrl: user.avatarUrl,
    },
    {
      sub: user.id.value,
      expiresIn: '30 days',
    },
  )
  return {
    token,
  }
})

// app.addHook('preHandler', async (request) => {
//   await request.jwtVerify()
// })
