import { initPaging } from './page'
import throttle from './throttle'

const onKeydown = (prev: () => void, next: () => void) =>
  (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': { e.preventDefault(); return next() }
      case 'ArrowLeft': { e.preventDefault(); return prev() }
      case 'ArrowRight': { e.preventDefault(); return next() }
      case 'ArrowUp': { e.preventDefault(); return prev() }
      default: return null
    }
  }

const onLoad = () => {
  const slides = Array.from(document.getElementsByClassName('slide'))
  const { next, prev, goToPage, getPage } = initPaging(slides)
  window.addEventListener('keydown', onKeydown(prev, next))
  const scroll = throttle(100, goToPage)
  window.addEventListener('scroll', () => scroll.onChange(window.pageYOffset / window.innerHeight))
  window.addEventListener('resize', () => goToPage(getPage()))
}

window.onload = onLoad