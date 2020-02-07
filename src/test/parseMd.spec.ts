import test from 'ava'
import { parseSlide } from '../parseMd'

test('parseSlide', t => {
  const one = `
    # Hello
  `
  const oneP = parseSlide(one)
  t.is(oneP.length, 1)
  t.is(oneP[0].type, 'md')
  t.is(oneP[0].value, '# Hello')

  const two = `
    Some text
    ![An image](http://somewhere.com/img.png)
  `
  const twoP = parseSlide(two)
  t.is(twoP.length, 2)
  t.is(twoP[0].type, 'md')
  t.is(twoP[1].type, 'image')

  const three = `
    \`\`\`js
      console.log('hello world')
    \`\`\`
  `
  const threeP = parseSlide(three)
  t.is(threeP[0].type, 'code')
  t.is(threeP[0].lang, 'js')
})