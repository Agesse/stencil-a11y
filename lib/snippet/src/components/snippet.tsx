import { Component, Prop, Watch } from '@stencil/core';
import * as Prism from "prismjs";

@Component({
  tag: 'pea11y-snippet',
  styleUrl: 'snippet.css'
})
export class Snippet {

  // Autres parametres
  @Prop() uris: any; // uri du fichier contenant le code html

  // Variables internes
  data: any = {};

  @Watch("uris")
  watchUris() {
    this.render();
  }

  componentWillLoad() {
    if (this.uris) {
      var promises = [];
      if (this.uris.html) {
        var promiseHTMl = fetch(this.uris.html)
          .then(response => response.text())
        promises.push(promiseHTMl);
      }
      if (this.uris.js) {
        var promiseJS = fetch(this.uris.js)
          .then(response => response.text())
        promises.push(promiseJS);
      }
      if (this.uris.css) {
        var promiseCSS = fetch(this.uris.css)
          .then(response => response.text())
        promises.push(promiseCSS);
      }

      return Promise.all(promises)
        .then(values => {
          this.data.html = Prism.default.highlight(values[0], Prism.default.languages.markup);
          this.data.js = Prism.default.highlight(values[1], Prism.default.languages.javascript);
          this.data.css = Prism.default.highlight(values[2], Prism.default.languages.css);
        });
    }
  }


  render() {
    return (
      <div>
        <pre class="language-markup"><code class="language-markup" innerHTML={this.data.html}></code></pre>
        <pre class="language-javascript"><code class="language-javascript" innerHTML={this.data.js}></code></pre>
        <pre class="language-css"><code class="language-css" innerHTML={this.data.css}></code></pre>
      </div>
    );
  }
}
