export interface SlideElement {
  type: 'md' | 'code' | 'image' | string
  lang?: string
  value: string
}

export type Slide = SlideElement[]