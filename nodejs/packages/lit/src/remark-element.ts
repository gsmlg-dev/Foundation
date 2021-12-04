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

  private _mid: string;
  private _fragement: string;

  constructor() {
    super();

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
    });
    this._mid = this.id || `t${+new Date()}`;
    this._fragement = '';
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
        this._fragement = String(vFile);
        return unsafeHTML(String(vFile));
      });
  }

  override updated() {
    const els : NodeListOf<HTMLElement> = this.renderRoot.querySelectorAll('code.language-mermaid');
    const fragement = document.createDocumentFragment();
    fragement.append(this._fragement);
    const contentEl : NodeListOf<HTMLElement> = fragement.querySelectorAll('code.language-mermaid');
    const wrap = document.createElement('div');
    document.body.appendChild(wrap);
    wrap.style.display='none';
    wrap.id = `mermaid-wrap-${this._mid}`;
    for (let i = 0, len = els.length; i < len; i += 1) {
      const box = document.createElement('div');
      box.id = `mermaid-${this._mid}-${i}`;
      wrap.append(box);
      box.style.display='none';
      const el = els[i];
      const txt = contentEl[i].innerText;
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
      mermaid.mermaidAPI.render(box.id, decodedTxt, cb);
      this._remove(box.id)
    }
    this._remove(wrap.id);
  }

  override render() {
    const md = this._generate();

    return html` ${until(md)} `;
  }

  private _decodeEntities(txt: string) : string {
    return txt
      .replace(/&gt;/ig, '>')
      .replace(/&lt;/ig, '<');
  }
  private _remove(id : string) {
    const els = document.querySelectorAll(`#${id}`);
    els.forEach((el) => {
      el.parentElement?.removeChild(el);
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'remark-element': RemarkElement;
  }
}
