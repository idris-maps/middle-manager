import terms from './terms'

const bullshitRe = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi')

const revealBullshit = (text: string) => {
  const c = text.charAt(0)
  const last = text.length - 1
  const bullshit = `${c === c.toUpperCase() ? 'B' : 'b'}ullshit`

  if (
    (text.charAt(last - 3) !== 'o' || text.charAt(last - 3) !=='e')
    && (text.substr(last - 2) === 'ors' || text.substr(last - 2) === 'ers')
  ) {
    return `${bullshit}ters`
  }
  if (
    (text.charAt(last - 2) !== 'o' || text.charAt(last - 2) !=='e')
    && (text.substr(last - 1) === 'or' || text.substr(last - 1) === 'er')
  ) {
    return `${bullshit}ter`
  }
  if (text.substr(last - 2) === 'ing') {
    return `${bullshit}ting`
  }
  if (text.charAt(last - 1) !== 's' && text.charAt(last) === 's') {
    return `${bullshit}s`
  }
  if (text.charAt(last - 2) !== 'e' && text.substr(last - 1) === 'ed') {
    return `${bullshit}ted`
  }
  return bullshit
}

export const replaceBullshit = (text: string): string =>
  text.replace(bullshitRe, revealBullshit)

const countWords = (text: string) =>
  text
    .replace(/(^\s*)|(\s*$)/gi,'') //exclude  start and end white-space
    .replace(/[ ]{2,}/gi,' ') // 2 or more space to 1
    .replace(/\n /,'\n') // exclude newline with a start spacing
    .split(' ')
    .filter(d => d !== '').length

export const countBullshit = (text: string) => {
  const fixed = replaceBullshit(text)
  const words = countWords(fixed)
  const bullshit = fixed.toLowerCase().split('bullshit').length - 1
  return {
    words,
    bullshit,
    score: Math.round(bullshit / words * 1000),
  }
}
