const didLoad = () => {
  Array.from(document.querySelectorAll('.mermaid svg style')).map(d => d.innerHTML = '');
  Array.from(document.querySelectorAll('.mermaid svg')).map(d => {
    d.removeAttribute('width');
    d.removeAttribute('height');
    d.removeAttribute('style');
  });
  Array.from(document.querySelectorAll('.mermaid-state circle')).map(d => {
    d.removeAttribute('style');
  });
  Array.from(document.querySelectorAll('.mermaid-state text')).map(d => {
    d.removeAttribute('font-size');
  });
};

if (window.mermaid) {
  mermaid.initialize({
    startOnLoad:true,
    theme: 'neutral',
    mermaid: {
      callback: didLoad,
    }
  });
} else {
  throw new Error('mermaid has not been loaded')
}
