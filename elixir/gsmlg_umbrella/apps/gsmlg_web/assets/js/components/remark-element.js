import {LitElement, html} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import { until } from "lit/directives/until.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

class RemarkElement extends LitElement {

  inputRef = createRef();

  constructor() {
    super();
    
  }

  markdown() {
    const content = this.innerHTML;
    return unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(content)
      .then((vFile) => {
        console.log(vFile);
        return unsafeHTML(String(vFile));
      });
  }

  render() {

    return html`
      <div class="markdown-container">
        ${until(this.markdown())}
      </div>
    `;
  }
}

customElements.define('remark-element', RemarkElement);
