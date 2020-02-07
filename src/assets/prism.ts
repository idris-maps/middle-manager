import { Asset } from './assets'

export default (): Asset[] => ([
  { type: 'css', path: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism.min.css' },
  { type: 'js', path: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/components/prism-core.min.js' },
  { type: 'js', path: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/plugins/autoloader/prism-autoloader.min.js' },
])