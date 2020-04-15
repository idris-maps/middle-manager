# middle-manager

*The no bullshit presentation tool*

---

## Write your slides in **markdown**

### *What is markdown?*

A simple markup language. Checkout this [cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and [the source of this presentation](https://raw.githubusercontent.com/idris-maps/middle-manager/master/demo/demo.md).

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

```csv
Index,Item,Cost,Tax,Total
1,"Fruit of the Loom Girl's Socks",7.97,0.60,8.57
2,"Rawlings Little League Baseball",2.97,0.22,3.19
3,"Secret Antiperspirant",1.29,0.10,1.39
4,"Deadpool DVD",14.96,1.12,16.08
5,"Maxwell House Coffee 28 oz",7.28,0.55,7.83
6,"Banana Boat Sunscreen, 8 oz",6.68,0.50,7.18
7,"WrenchSet, 18 pieces",10.00,0.75,10.75
8,"Mand M, 42 oz",8.98,0.67,9.65
9,"Bertoli Alfredo Sauce",2.12,0.16,2.28
10,"Large Paperclips, 10 boxes",6.19,0.46,6.65
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

## 🎉 You can use emojis 🦄

But really, you should not.

---

## Disrupt your processes

This amazing presentation tool helps you increase your productivity, communicate with all stakeholders and become the forward-thinking thought-leader you always dreamt of being.

### [Try it now!](https://github.com/idris-maps/middle-manager)