import path from 'path'

export const rootPath = path.resolve('.')
export const srcPath = path.resolve(rootPath, 'src')
export const assetsPath = path.resolve(rootPath, 'assets')

export const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN!
export const REPLICATE_BASE_URL = process.env.REPLICATE_BASE_URL!
export const MODEL_OWNER = process.env.MODEL_OWNER!
export const MODEL_NAME = process.env.MODEL_NAME!
export const NEGATIVE_PROMPT =
  'blurry, deformed, watermark, dark lighting, image caption, caption, text, cropped, low quality, low resolution, malformed, messy, blurry, watermark'
