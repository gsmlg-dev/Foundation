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
      await new Promise((f) => setTimeout(f, 1000));
      
      const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

      const resp = await fetch('/node_management', {
        method: 'POST',
        headers: {
          'x-csrf-token': csrfToken,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          action: 'set-node-cookie',
          cookie: this.cookie,
        }),
      });
      const data = await resp.json();
      const { cookie } = data;
      const el = document.getElementById('node-cookie-value');
      el.innerText = cookie;
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
