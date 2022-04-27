import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { parseJWT } from '@gsmlg/utils';

@customElement('jwt-viewer')
export class JwtViewer extends LitElement {
  static override styles = css`
    :root {
      width: inherit;
      height: inherit;
      font-size: inherit;
    }
  `;

  @property({ type: String, reflect: true, attribute: true })
  token: string = '';

  override render() {
    const p = parseJWT(this.token);
    return html`
      <pre>${JSON.stringify(p, null, 4)}</pre>
    `;
  }
}
