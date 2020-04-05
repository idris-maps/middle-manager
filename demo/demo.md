# middle-manager

*The no bullshit presentation tool*

---

## Write your slides in **markdown**

### *What is markdown?*

A simple markup language. Checkout this [cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and [the source of this presentation](https://raw.githubusercontent.com/idris-maps/middle-manager/master/demo.md).

### *How are the slides separated?*

With three dashes.

---

## Cut the bullshit

We help you be clear, concise and avoid unnecessary fluff. `middle-manager` always shows you a *bullshit score*™, ranking the amount of bullshit in your presentation between 0 and 1000.

To see which words are nonsense, add the `-bs` flag to your command.

```bash
middle-manager -md my-presentation.md -o my-presentation.html -bs
```

They will be replaced by the literal word *bullshit*.

---

![Replace bullshit demo](bullshit.png)

We would love to pretend the *bullshit detector*™ is based on our proprietary AI

...but it did not pass said detector. It uses the, nonetheless excellent, [bullshit.js](https://mourner.github.io/bullshit.js/)

---

## Markdown tables are a pain

Use `csv`,`tsv` or `dsv` code blocks instead.

```dsv;
Year;Make;Model
1997;Ford;E350
2000;Mercury;Cougar
```

---

## Other code blocks are highlighted

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

## Disrupt your processes

This amazing presentation tool helps you increase your productivity, communicate with all stakeholders and become the forward-thinking thought-leader you always dreamt of being.

### [Try it now!](https://github.com/idris-maps/middle-manager)