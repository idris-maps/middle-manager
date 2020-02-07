import test from 'ava'
import { countBullshit, replaceBullshit } from '../bullshit'

test('bullshit', t => {
  const text = 'branding and artificial intelligence ambassador'
  t.is(
    replaceBullshit(text),
    'bullshitting and bullshit bullshitter'
  )
  const { bullshit, words, score } = countBullshit(text)
  t.is(bullshit, 3)
  t.is(words, 4)
  t.is(score, 750)
})