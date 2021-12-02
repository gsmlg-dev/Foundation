import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkPrism from 'remark-prism';

@customElement('remark-element')
export class RemarkElement extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
    li > * {
      display: inline;
    }
    li > ul {
      display: block;
    }
  `;

  @property()
  content = '';

  private _generate() {
    const content = this.content || this.innerHTML;
    return unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkPrism)
      .use(remarkHtml)
      .process(content)
      .then((vFile) => {
        return unsafeHTML(String(vFile));
      });
  }

  override render() {
    const md = this._generate();

    return html` ${until(md)} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'remark-element': RemarkElement;
  }
}
