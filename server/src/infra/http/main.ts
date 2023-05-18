import { environment } from 'src/config/env'
import { app } from './app'

app.listen({
  port: environment.PORT,
  host: '0.0.0.0',
})
