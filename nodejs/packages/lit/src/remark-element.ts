import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

import mermaid from 'mermaid';

import github from './github.css';
import light from './atom-one-light.css';
import dark from './atom-one-dark.css';

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
    ${unsafeCSS(github)}
    @media (prefers-color-scheme: dark) {
      ${unsafeCSS(dark)}
    }
    @media (prefers-color-scheme: light) {
      ${unsafeCSS(light)}
    }
  `;

  @property({ type: Boolean })
  debug : boolean = false;

  @property()
  content : string = '';


  constructor() {
    super();

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
    })
  }

  private _generate() {
    const content = this.content || this.innerHTML;
    return unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight, { ignoreMissing: true })
      .use(rehypeStringify)
      .process(content)
      .then((vFile) => {
        return unsafeHTML(String(vFile));
      });
  }

  override updated() {
    const els : NodeListOf<HTMLElement> = this.renderRoot.querySelectorAll('code.language-mermaid');
    const wrap = document.createElement('div');
    document.body.appendChild(wrap);
    wrap.style.display='none';
    wrap.id = 'mermaid-wrap';
    for (let i = 0, len = els.length; i < len; i += 1) {
      const box = document.createElement('div');
      box.id = `mermaid-${i}`;
      wrap.appendChild(box);
      const el = els[i];
      const txt = el.innerText;
      if (this.debug) {
        console.log(txt);
      }
      const cb = (svgGraph: string) => {
        if (this.debug) {
          console.log(svgGraph)
        }
        el.innerHTML = svgGraph;
      };
      const decodedTxt = this._decodeEntities(txt);
      if (this.debug) {
        console.log(decodedTxt);
      }
      mermaid.mermaidAPI.render(`mermaid-${i}`, decodedTxt, cb);
      wrap.removeChild(box);
    }
    document.body.removeChild(wrap);
  }

  override render() {
    const md = this._generate();

    return html` ${until(md)} `;
  }

  private _decodeEntities(txt: string) : string {
    return txt
      .replace('&gt;', '>')
      .replace('&lt;', '<');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'remark-element': RemarkElement;
  }
}
