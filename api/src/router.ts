import { FastifyInstance } from 'fastify'
import { rootController } from './controller/rootController'
import { trainController } from './controller/trainController'
import { predictController } from './controller/predictController'

export async function router(fastify: FastifyInstance) {
  fastify.register(rootController, { prefix: '/api/' })
  fastify.register(trainController, { prefix: '/api/train' })
  fastify.register(predictController, { prefix: '/api/predict' })
}
