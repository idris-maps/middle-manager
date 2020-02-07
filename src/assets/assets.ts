export interface CssFilePath {
  type: 'css'
  path: string
}

export interface JsFilePath {
  type: 'js'
  path: string
}

export interface CssFileContent {
  type: 'css'
  content: string
}

export interface JsFileContent {
  type: 'js'
  content: string
}

export interface ImgFilePath {
  type: 'image'
  path: string
}

export type Asset = CssFileContent | CssFilePath | JsFileContent | JsFilePath | ImgFilePath

export const isCssContent = (d: any): d is CssFileContent =>
  d && d.type && d.type === 'css' && d.content

export const isCssPath = (d: any): d is CssFilePath =>
  d && d.type && d.type === 'css' && d.path

export const isJsContent = (d: any): d is CssFileContent =>
  d && d.type && d.type === 'js' && d.content

export const isJsPath = (d: any): d is CssFilePath =>
  d && d.type && d.type === 'js' && d.path

export const isImgPath = (d: any): d is ImgFilePath =>
  d && d.type && d.type === 'img' && d.path

export const isAsset = (d: any): d is Asset =>
  isCssContent(d)
  || isCssPath(d)
  || isJsContent(d)
  || isJsPath(d)
  || isImgPath(d)