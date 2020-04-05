> "When we understand that slide, we’ll have won the war." - Gen. Stanley A. McChrystal

> "PowerPoint makes us stupid" - Gen. James N. Mattis

> "It’s dangerous because it can create the illusion of understanding and the illusion of control. Some problems in the world are not bullet-izable." - Brig. Gen. H. R. McMaster

[We Have Met the Enemy and He Is PowerPoint](https://www.nytimes.com/2010/04/27/world/27powerpoint.html)

If you have a meaningful message, you should be able to say it without support. The time you spend preparing slides is time you do not spend solving actual problems. Do you really need to make a presentation? Think again.

Ok, ok, I get it. It helps you remember what to say. And doing presentations is kind of your job anyway. Then this is the tool for you.

# middle-manager

*The no bullshit presentation tool*

Write your presentation in [markdown](https://www.markdownguide.org/getting-started/), separate your slides with three dashes `---` and run:

```
npx middle-manager -md my-presentation.md -o my-presentation.html 
```

or install the package globally:

```
npm install middle-manager -g
```

Checkout the [demo](https://middle-manager.surge.sh).

## Cut the bullshit

We help you be clear, concise and avoid unnecessary fluff. `middle-manager` always shows you a *bullshit score*™, ranking the amount of bullshit in your presentation between 0 and 1000.

To see which words are nonsense, add the `-bs` flag to your command.

```bash
middle-manager -md my-presentation.md -o my-presentation.html -bs
```

They will be replaced by the literal word *bullshit*.

![Replace bullshit demo](https://raw.githubusercontent.com/idris-maps/middle-manager/master/demo/bullshit.png)

We would love to pretend the *bullshit detector*™ is based on a proprietary AI. But it did not pass said detector. It uses the, nonetheless excellent, [bullshit.js](https://mourner.github.io/bullshit.js/) under the hood.

## Tables

Markdown tables are a pain. With `middle-manager`, you can use `csv`, `tsv` or `dsv` code blocks instead. `csv` and `tsv` are respectively for comma and tab separated values. If you paste from a spreadsheet, use `tsv`.

`dsv` is for any other delimiters. You need to define the delimiter like this `dsv;`, for semicolon separated values for example.

## Code highlighting

Any other code blocks will be highlighted with [`prism`](https://prismjs.com/).

## Images

The html page produced by `middle-manager`, contains all slides, css and script necessary. However images are not included. If you use local images on your machine, make sure you ship them with the page.

## Themes

At the moment there are three themes:

* [`dark`](https://middle-manager.surge.sh)
* [`light`](https://middle-manager.surge.sh/light.html)
* [`paper`](https://middle-manager.surge.sh/paper.html)

`dark` is the default. Set another theme with the `-t` flag.

```
middle-manager -md my-presentation.md -o my-presentation.html -t light
```

If you feel like creating a new theme, have a look at the [`src_style`](https://github.com/idris-maps/middle-manager/tree/master/src_style) folder. PRs are welcome.

## Why `middle-manager`?

There are many presentation tools, how does `middle-manager` compare with the competition?

Desktop tools such as PowerPoint are very powerful. But that is their curse. You will spend a lot of time fiddling with alignment and styling. Using just markdown lets you focus on your message.

Tools such as [`impress`](https://impress.js.org), [`reveal`](https://revealjs.com) and [`MDX deck`](https://github.com/jxnblk/mdx-deck) are much fancier but come with the javascript creep the modern internet has gotten us used to. `middle-manager`, being a command line tool, produces lightweight presentation decks with minimal overhead. The [demo deck](https://middle-manager.surge.sh/) weighs 10kb.