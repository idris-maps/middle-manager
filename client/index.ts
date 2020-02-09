import { initPaging } from './page'
import throttle from './throttle'

const onKeydown = (prev: () => void, next: () => void) =>
  (e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
      case 'ArrowDown': { return next() }
      case 'ArrowLeft': { return prev() }
      case 'ArrowRight': { return next() }
      case 'ArrowUp': { return prev() }
      default: return null
    }
  }

const onLoad = () => {
  const slides = Array.from(document.getElementsByClassName('slide'))
  const { next, prev, goToPage } = initPaging(slides)
  window.addEventListener('keydown', onKeydown(prev, next))
  const scroll = throttle(100, goToPage)
  window.addEventListener('scroll', () => scroll.onChange(window.pageYOffset / window.innerHeight))
}

window.addEventListener('load', onLoad)
