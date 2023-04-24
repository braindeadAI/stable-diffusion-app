require('dotenv').config()
import { app } from './app'

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006

app.listen(FASTIFY_PORT)

console.log(`🚀  Fastify server running on http://localhost:${FASTIFY_PORT}`)
