import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { parseJWT } from '@gsmlg/utils/src/parseJWT.js';

type TokenType = {
  header: {
    typ: string;
    alg: string;
  };
  payload: object;
  signatrue: string;
};

@customElement('jwt-viewer')
export class JwtViewer extends LitElement {
  static override styles = css`
    :root {
      width: inherit;
      height: inherit;
      font-size: inherit;
    }
    .row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
    }
    .row:not(:last-child) {
      border-bottom: 1px solid #64c2c7;
    }
    .row > label,
    .row > div {
      margin: 0.3rem 2rem;
    }
    .row > label {
      width: 6rem;
      text-align: right;
      color: cadetblue;
    }
    .row > label::after {
      display: inline-block;
      content: ':';
      color: hotpink;
    }
    .column {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .value {
      color: cornflowerblue;
    }
  `;

  @property({ type: String, reflect: true, attribute: true })
  token: string = '';

  override render() {
    const p: TokenType = parseJWT(this.token);
    return html`
      <div class="column">
        <div class="row">
          <label>Header</label>
          <div class="column">
            <div class="row">
              <label>Algorithm</label>
              <div class="value">${p.header.alg}</div>
            </div>
            <div class="row">
              <label>Type</label>
              <div class="value">${p.header.typ}</div>
            </div>
          </div>
        </div>
        <div class="row">
          <label>Payload</label>
          <div class="column">
            ${Object.keys(p.payload).map(
              (k) => html`
                <div class="row">
                  <label>${k}</label>
                  <div class="value">${p.payload[k]}</div>
                </div>
              `,
            )}
          </div>
        </div>
        <div class="row">
          <label>Signatrue</label>
          <div class="value">${p.signatrue}</div>
        </div>
      </div>
    `;
  }
}
