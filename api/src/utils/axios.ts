import axios from 'axios'
import { REPLICATE_API_TOKEN, REPLICATE_BASE_URL } from '../config'

axios.defaults.baseURL = REPLICATE_BASE_URL
axios.defaults.headers.common = {
  Authorization: `Token ${REPLICATE_API_TOKEN}`,
}

export { axios }
