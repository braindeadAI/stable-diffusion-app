import { FastifyInstance } from 'fastify'
import { axios } from '../utils/axios'
import { TrainBodyType } from '../schemas/train'

export async function trainController(fastify: FastifyInstance) {
  fastify.post<{
    Body: TrainBodyType
  }>('/', async (req, reply) => {
    try {
      await axios.post('trainings', req.body)
      reply.send({ message: 'Train data sent successfully' })
    } catch (error) {
      throw error
    }
  })
}
