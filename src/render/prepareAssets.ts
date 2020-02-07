import { promisify } from 'util'
import { writeFile } from 'fs'
import axios from 'axios'
import { resolve, parse } from 'path'
import { v4 } from 'uuid'
import { Asset, isAssetPath, AssetPath } from '../assets/assets'
import getMermaidScripts from '../assets/mermaid'
import getPrismAssets from '../assets/prism'
import { getMainCss, getMermaidCss } from '../themes'
import getMainJs from '../assets/main'

const write = promisify(writeFile)

const ifMermaid = (yes: boolean, css: string): Asset[] =>
  yes ? getMermaidScripts(css) : []

const ifPrism = (yes: boolean) =>
  yes ? getPrismAssets() : []

const generateAsset = (folder: string) => async (asset: Asset): Promise<AssetPath> => {
  const name = v4()
  if (isAssetPath(asset)) {
    const { data } = await axios.get(asset.path)
    const fileName = `${name}.${parse(asset.path).ext}`
    await write(resolve(folder, fileName), data)
    return { type: asset.type, path: fileName }
  }
  const fileName = `${name}.${asset.type}`
  await write(resolve(folder, fileName), asset.content)
  return { type: asset.type, path: fileName }
}

const generateAssets = (folder: string, assets: Asset[]) =>
  Promise.all(assets.map(generateAsset(folder)))

export default async (
  folder: string,
  mermaid: boolean,
  prism: boolean
): Promise<AssetPath[]> => {
  const mainCss = await getMainCss()
  const mermaidCss = await getMermaidCss()
  const mainJs = await getMainJs()
  const assets = [
    mainCss,
    mainJs,
    ...ifMermaid(mermaid, mermaidCss.content),
    ...ifPrism(prism),
  ]
  return await generateAssets(folder, assets)
}