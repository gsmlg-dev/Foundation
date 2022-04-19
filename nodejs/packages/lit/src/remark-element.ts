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
class RemarkElement extends LitElement {
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

  @property({ type: Boolean, attribute: true, reflect: true })
  debug: boolean = false;

  private _content: string | undefined = undefined;
  set content(val: string | undefined) {
    const oldVal = this._content;
    this._content = val;
    this.requestUpdate('content', oldVal);
  }
  get content() {
    return this._content;
  }

  private _mid: string;
  private _fragement: string;

  constructor() {
    super();

    // const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    mermaid.initialize({
      startOnLoad: false,
      // theme: isDark ? 'dark' : 'default',
    });
    this._mid = this.id || `t${+new Date()}`;
    this._fragement = '';
  }

  private _generate() {
    const content = this.content ?? this.innerHTML;

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

  private _do_updated() {
    const els: NodeListOf<HTMLElement> = this.renderRoot.querySelectorAll(
      'code.language-mermaid',
    );
    const fragement = document.createElement('div');
    fragement.innerHTML = this._fragement;
    const contentEls: NodeListOf<HTMLElement> = fragement.querySelectorAll(
      'code.language-mermaid',
    );

    for (let i = 0, len = els.length; i < len; i += 1) {
      const boxId = `mermaid-${this._mid}-${i}`;
      let box = document.getElementById(boxId);
      if (!box) {
        box = document.createElement('div');
        box.id = boxId;
        document.body.append(box);
        box.style.display = 'none';
      }
      const el = els[i];
      const txt = contentEls[i].innerText;
      if (this.debug) {
        console.log(txt);
      }
      const cb = (svgGraph: string) => {
        if (this.debug) {
          console.log(svgGraph);
        }
        el.innerHTML = svgGraph;
      };
      const decodedTxt = this._decodeEntities(txt);
      if (this.debug) {
        console.log(decodedTxt);
      }
      mermaid.mermaidAPI.render(box.id, decodedTxt, cb);
    }
  }

  override updated() {
    setTimeout(() => this._do_updated(), 1000 / 60);
  }

  // override attributeChangedCallback(...args) {
  //   if (this.debug) {
  //     console.log(...args);
  //   }
  //   this.requestUpdate(...args);
  // }

  override render() {
    const md = this._generate();

    return html`${until(md)}`;
  }

  private _decodeEntities(txt: string): string {
    return txt.replace(/&gt;/gi, '>').replace(/&lt;/gi, '<');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'remark-element': RemarkElement;
  }
}
