import { Slide } from '../types'
import Tag from 'xml-string/dist/Tag'
import createElement from './createElement'

const hasImage = (slide: Slide) =>
  slide.map(d => d.type).includes('image')

const hasCode = (slide: Slide) =>
  slide.filter(d => d.type === 'code').length > 0

const countCodeLines = (slide: Slide) =>
  slide.filter(d => d.type === 'code')
    .map(d => d.value.trim().split('\n').length)
    .reduce((r, d) => r + d, 0)

const getContainer = (slide: Slide, root: Tag): Tag => {
  if (hasImage(slide)) {
    return root
      .child('div').attr({ 'class': 'slide-with-image' })
  }
  if (hasCode(slide)) {
    return root
      .child('div').attr({ 'class': 'slide-container' })
      .child('div').attr({ 'class': 'slide-with-code' })
  }
  return root
    .child('div').attr({ 'class': 'slide-container' })
}

export default (body: Tag) => (slide: Slide) => {
  const linesOfCode = countCodeLines(slide)
  const root =  body.child('div').attr({ 'class': 'slide' })
  const container = getContainer(slide, root)
  slide.forEach(createElement(linesOfCode, container))
}
