import { Slide } from '../parseMd'
import renderElement from './renderElement'

const hasImage = (slide: Slide) =>
  slide.map(d => d.type).includes('image')

export default (slide: Slide) =>
  hasImage(slide)
   ? `
<div class="slide">
  <div class="slide-with-image">
    ${slide.map(renderElement).join(`\n\t\t`)}
  </div>
</diV>
    `
  : `
<div class="slide">
  ${slide.map(renderElement).join(`\n\t`)}
</div>
    `