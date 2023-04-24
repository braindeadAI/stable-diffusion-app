import { REPLICATE_API_TOKEN } from '../config'
import Replicate from 'replicate'

export const replicate = new Replicate({
  auth: REPLICATE_API_TOKEN,
})
