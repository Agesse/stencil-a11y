function initSnippet() {
  var promiseHTMl = fetch("http://localhost:8000/assets/snippets/snippet/html.txt")
    .then(response => response.text())
  var promiseJS = fetch("http://localhost:8000/assets/snippets/snippet/js.txt")
    .then(response => response.text())
  var promiseCSS = fetch("http://localhost:8000/assets/snippets/snippet/css.txt")
    .then(response => response.text())

  return Promise.all([promiseHTMl, promiseJS, promiseCSS])
    .then(values => {
      document.querySelector("pea11y-snippet").dataHtml = values[0];
      document.querySelector("pea11y-snippet").dataJs = values[1];
      document.querySelector("pea11y-snippet").dataCss = values[2];
    });

}
