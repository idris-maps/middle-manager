
const initPager = (length, index = 0) => {
  const all = length
  let current = index
  let listeners = []
  const broadcast = () => listeners.map(f => f(current))
  return {
    next: () => {
      current = current === all - 1 ? 0 : current + 1
      broadcast()
    },
    prev: () => {
      current = current === 0 ? current = all - 1 : current - 1
      broadcast()
    },
    subscribe: listener => {
      listeners = [...listeners, listener]
    },
    get: () => current
  }
}

const initSwiper = () => {
  let isDown = false
  let start = null
  let listeners = []
  const broadcast = swipe => listeners.map(f => f(swipe))
  return {
    onMouseDown: e => {
      isDown = true
      start = e.clientY
    },
    onMouseUp: e => {
      const diff = e.clientY - start
      if (Math.abs(diff) > window.innerHeight * 0.2) {
        broadcast(diff < 0 ? 'next' : 'prev')
      }
      isDown = false
      start = null
    },
    subscribe: listener => {
      listeners = [...listeners, listener]
    },
  }
}


const slides = Array.from(document.getElementsByClassName('slide'))
const page = initPager(slides.length)

const goToIndex = index => slides[index].scrollIntoView({ behavior: 'smooth' })
page.subscribe(goToIndex)

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowDown': { e.preventDefault(); return page.next() }
    case 'ArrowLeft': { e.preventDefault(); return page.prev() }
    case 'ArrowRight': { e.preventDefault(); return page.next() }
    case 'ArrowUp': { e.preventDefault(); return page.prev() }
    default: return null
  }
})

window.addEventListener('scroll', () => goToIndex(page.get()))
window.addEventListener('resize', () => goToIndex(page.get()))

const swipe = initSwiper()
swipe.subscribe(direction => {
  if (direction === 'next') { page.next() }
  if (direction === 'prev') { page.prev() }
})

window.addEventListener('mousedown', swipe.onMouseDown)
window.addEventListener('mouseup', swipe.onMouseUp)
