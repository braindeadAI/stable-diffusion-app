import { FastifyInstance } from 'fastify'

export async function rootController(fastify: FastifyInstance) {
  fastify.get('/', async (_req, reply) => {
    reply.send({
      msg: 'Stable Diffusion App API',
    })
  })
}
