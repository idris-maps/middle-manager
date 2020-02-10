if (!mermaid) {
  throw new Error('Mermaid library was not loaded')
}

const getCss = (theme = 'dark') => `
.node polygon, .node rect, .node circle, .node path, .node ellipse { fill: none; stroke: white; }
.edgePath .path { stroke: white; }
.edgePath marker path { fill: white; }
.edgeLabel { background-color: rgba(25, 25, 25,0.8); color: white; }
.label { color: white; }

rect.actor { fill: rgb(25, 25, 25); stroke: white; }
text.actor { fill: white; }
.actor-line { stroke: darkgray; }
.messageText { fill: white; }
#arrowhead, #crosshead, #sequencenumber { fill: darkgray; }
.messageLine0, .messageLine1 { stroke: darkgray; }
rect.activation0, rect.activation1 { stroke: darkgray; fill: black; }
rect.note { fill: darkgray; stroke: gray; }
`

mermaid.initialize({
  theme: 'neutral',
  // @ts-ignore
  themeCSS: getCss(),
})