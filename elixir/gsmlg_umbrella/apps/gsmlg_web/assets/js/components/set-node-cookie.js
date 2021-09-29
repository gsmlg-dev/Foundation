import {LitElement, html} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';


class SetNodeCookie extends LitElement {

  inputRef = createRef();

  constructor() {
    super();
    
    this.cookie = '';
    this._loading = false;
  }

  get loading() {
    return this._loading;
  }

  set loading(val) {
    this._loading = !! val;
    this.requestUpdate();
  }

  async clickMe(evt) {
    this.loading = true;
    try {
      await new Promise((f) => setTimeout(f, 3000));
      const resp = await fetch('/api/node_management', {
        method: 'POST',
        body: JSON.stringify({
          action: 'set-node-cookie',
        })
      });
      const data = await resp.json();

      this.loading = false;
    } catch(e) {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="form-group">
          <input type="text" @change=${(evt) => this.cookie = evt.target.value} .value=${this.cookie} ?disabled=${this.loading} />
          <button @click=${this.clickMe} ?disabled=${this.loading}>
              ${this.loading ? 'Updating ...' : 'Set Cookie'}
          </button>
      </div>
    `;
  }
}

customElements.define('set-node-cookie', SetNodeCookie);
