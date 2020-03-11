export const initPaging = (slides: Element[]) => {
  let page = 0
  const pages = slides.length
  const goToPage = (page: number) =>
    slides[page].scrollIntoView({ behavior: 'smooth' })
  return {
    next: () => {
      page = page === pages - 1 ? 0 : page + 1
      goToPage(page)
    },
    prev: () => {
      page = page === 0 ? page = pages - 1 : page - 1
      goToPage(page)
    },
    goToPage: (newPage: number) => {
      page = newPage
      goToPage(newPage)
    },
    getPage: () => page
  }
}

