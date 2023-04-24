import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { assetsPath } from '../config'

export async function createModelDirectory(
  modelOwner: string,
  modelName: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const assetsPath = getAssetsPathByModel(modelOwner, modelName)

    fs.mkdir(assetsPath, { recursive: true }, (err) => {
      if (err) reject(err)
      resolve(`${assetsPath} has been created successfully.`)
    })
  })
}

export async function downloadAndSaveModelImage(
  url: string,
  imgPath: string,
): Promise<string> {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })

  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(imgPath))
      .on('error', reject)
      .once('close', () => resolve(imgPath))
  })
}

export async function deleteModelImage(
  modelOwner: string,
  modelName: string,
  imgFileName: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const imgPath = getImagePathByModel(imgFileName, modelOwner, modelName)

    fs.unlink(imgPath, (err) => {
      if (err && err.code == 'ENOENT') {
        resolve(`${path} doesn't exist, won't remove it.`)
      } else if (err) {
        reject(`Error occurred while trying to remove ${path}.`)
      } else {
        resolve(`${path} has been removed.`)
      }
    })
  })
}

export function getImagePathByModel(
  imgFileName: string,
  modelOwner: string,
  modelName: string,
): string {
  return path.resolve(getAssetsPathByModel(modelOwner, modelName), imgFileName)
}

export function getAssetsPathByModel(
  modelOwner: string,
  modelName: string,
): string {
  return path.resolve(assetsPath, modelOwner, modelName)
}
