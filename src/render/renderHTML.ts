import { Slide } from '../parseMd'
import { AssetPath } from '../assets/assets'
import renderSlide from './renderSlide'

interface HTMLProps {
  assets: AssetPath[]
  slides: Slide[]
  title: string
}

export default ({
  assets,
  slides,
  title,
}: HTMLProps) => `
<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    ${assets.filter(d => d.type === 'css').map(d => `<link href="${d.path}" rel="stylesheet" />`).join(`\n    `)}
  </head>
  <body>
    ${slides.map(renderSlide).join('\n    ')}
    ${assets.filter(d => d.type === 'js').map(d => `<script src="${d.path}"></script>`).join('\n    ')}
  </body>
</html>
`
