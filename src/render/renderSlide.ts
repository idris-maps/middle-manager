import { Slide } from '../parseMd'
import renderElement from './renderElement'

const hasImage = (slide: Slide) =>
  slide.map(d => d.type).includes('image')
  || slide.filter(d => d.type === 'code').length > 0

const countCodeLines = (slide: Slide) =>
  slide.filter(d => d.type === 'code')
    .map(d => d.value.trim().split('\n').length)
    .reduce((r, d) => r + d, 0)


export default (slide: Slide) =>
  hasImage(slide)
   ? `
<div class="slide">
  <div class="slide-with-image">
    ${slide.map(renderElement(countCodeLines(slide))).join(`\n\t\t`)}
  </div>
</div>
    `
  : `
<div class="slide">
  ${slide.map(renderElement(countCodeLines(slide))).join(`\n\t`)}
</div>
    `