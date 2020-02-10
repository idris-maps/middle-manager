import { Slide } from '../parseMd'
import renderElement from './renderElement'

const hasImage = (slide: Slide) =>
  slide.map(d => d.type).includes('image')
  || slide.filter(d => d.type === 'code').length > 0

export default (slide: Slide) =>
  hasImage(slide)
   ? `
<div class="slide">
  <div class="slide-with-image">
    ${slide.map(renderElement).join(`\n\t\t`)}
  </div>
</div>
    `
  : `
<div class="slide">
  ${slide.map(renderElement).join(`\n\t`)}
</div>
    `