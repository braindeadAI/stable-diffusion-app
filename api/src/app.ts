import fastify from 'fastify'
import cors from 'fastify-cors'
import { router } from './router'

export const app = fastify({
  logger: {
    prettyPrint: {
      translateTime: 'HH:MM:ss Z',
      messageFormat: '{res.statusCode}{req.method} {req.hostname}{req.url}',
      ignore: 'pid,hostname,responseTime,reqId,req,res',
    },
  },
})

app.register(cors, {
  origin: '*',
})
app.register(router)
