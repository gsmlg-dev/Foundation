import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
// import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from '@mapbox/rehype-prism';

import {VFile} from 'vfile';
const oceanic = new VFile({ path: 'prism-themes/themes/prism-material-oceanic.css' });
const light = new VFile({ path: 'prism-themes/themes/prism-material-light.css' });
const dark = new VFile({ path: 'prism-themes/themes/prism-material-dark.css' });

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
    ${oceanic.toString()}
    @media (prefers-color-scheme: dark) {
      ${dark.toString()}
    }
    @media (prefers-color-scheme: light) {
      ${light.toString()}
    }
  `;

  @property()
  content = '';

  private _generate() {
    const content = this.content || this.innerHTML;
    return unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypePrism) // eslint-disable-line @typescript-eslint/no-unsafe-argument
      .use(rehypeStringify)
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
