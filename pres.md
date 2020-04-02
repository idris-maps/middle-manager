# Hello

---

## Disrupt your processes

This amazing presentation tool will help you increase your productivity and communicate with all stakeholders. It will make you become the forward-thinking thought-leader you always dreamt of being.

---

## **Some** text

 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor velit eros, eu mattis lorem finibus nec. In tempor bibendum diam laoreet eleifend. Vivamus volutpat luctus bibendum. Maecenas pretium nibh nec est hendrerit pretium. Cras et erat viverra, pulvinar diam ac, imperdiet est. Quisque ultricies leo nec mauris rutrum, at eleifend enim pulvinar. Fusce imperdiet tincidunt massa in auctor. In tincidunt fermentum est vitae fermentum. Donec non lorem a urna placerat porttitor. Proin rhoncus nibh vitae erat pretium commodo. Maecenas et leo mollis, molestie tortor sed, eleifend dui. Duis a enim nec lacus tincidunt vulputate. Vestibulum porta consectetur nisi, quis sodales purus ornare at. Nulla non mattis lectus, quis ultrices quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum, nisi a rhoncus volutpat, dui arcu ultricies ligula, at suscipit dui metus eget mi.

---

## A list

* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
* Sed auctor velit eros, eu mattis lorem finibus nec.
* In tempor bibendum diam laoreet eleifend.
* Vivamus volutpat luctus bibendum.
* Maecenas pretium nibh nec est hendrerit pretium.

---

## An ordered list

1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
2. Sed auctor velit eros, eu mattis lorem finibus nec.
3. In tempor bibendum diam laoreet eleifend.
4. Vivamus volutpat luctus bibendum.
5. Maecenas pretium nibh nec est hendrerit pretium.

---

## Block quote

>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor velit eros, eu mattis lorem finibus nec. In tempor bibendum diam laoreet eleifend. Vivamus volutpat luctus bibendum. Maecenas pretium nibh nec est hendrerit pretium.

---


## Small code

```ts
const x = (n: number) => n + 1
```

---

## Medium code

```ts
const onLoad = () => {
  const slides = Array.from(document.getElementsByClassName('slide'))
  const { next, prev, goToPage, getPage } = initPaging(slides)
  window.addEventListener('keydown', onKeydown(prev, next))
  const scroll = throttle(100, goToPage)
  window.addEventListener('scroll', () => scroll.onChange(window.pageYOffset / window.innerHeight))
  window.addEventListener('resize', () => goToPage(getPage()))
}
```

---

## Big code

```ts
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
```
---

## Vertical image

![img](./images/vertical.png)

---

## Horizontal image

![img](./images/horizontal.png)

---

![img](./images/horizontal.png)
