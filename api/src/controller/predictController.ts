import { FastifyInstance } from 'fastify'
import slugify from 'slugify'
import { replicate } from '../utils/replicate'
import { MODEL_NAME, MODEL_OWNER, NEGATIVE_PROMPT } from '../config'
import {
  createModelDirectory,
  downloadAndSaveModelImage,
  getImagePathByModel,
} from '../utils/file'

export async function predictController(fastify: FastifyInstance) {
  fastify.get('/', async (_req, reply) => {
    const result = await downloadPrompt(
      'xyz dog admiring a flock of sheep, medieval background, manga key visual, by Kentaro Miura',
      NEGATIVE_PROMPT,
    )
    reply.send(result)
  })
}

async function downloadPrompt(
  prompt: string,
  negativePrompt: string,
  numOutputs = 1,
) {
  log(prompt, negativePrompt, numOutputs)

  const model = await replicate.models.get(MODEL_OWNER, MODEL_NAME)

  const identifier =
    `${MODEL_OWNER}/${MODEL_NAME}:${model.latest_version?.id}` as any
  const imgUrls = (await replicate.run(identifier, {
    input: {
      prompt,
      width: 512,
      height: 512,
      negative_prompt: negativePrompt,
      num_outputs: numOutputs,
    },
  })) as string[]

  // Make sure that the directory where we want
  // to save the images exists
  await createModelDirectory(MODEL_OWNER, MODEL_NAME)

  const results: string[] = []

  // Loop through the images and store them into the assets folder
  for (const imgUrl of imgUrls) {
    const imgFileName = getImgFileName(imgUrl, prompt)
    results.push(imgFileName)
    console.log('imgUrl:', imgUrl)
    console.log('imgFileName:', imgFileName)

    const imgPath = getImagePathByModel(imgFileName, MODEL_OWNER, MODEL_NAME)
    const result = await downloadAndSaveModelImage(imgUrl, imgPath)
    console.log('imgSave result:', result)
  }

  return results
}

function log(prompt: string, negativePrompt: string, numOutputs: number) {
  const separator =
    '====================================================================='
  console.log(separator)
  console.log('prompt:', prompt)
  console.log('negativePrompt:', negativePrompt)
  console.log('numOutputs:', numOutputs)
  console.log(separator)
}

function getImgFileName(url: string, prompt: string): string {
  const imgId = url.split('/')[4].slice(0, 6)
  const imgDate = new Date().toISOString().slice(0, 10)
  const imgExt = url.split('.')[2]
  const imgPrompt = slugify(prompt)

  return `${imgDate}-${imgId}-${imgPrompt}.${imgExt}`
}
