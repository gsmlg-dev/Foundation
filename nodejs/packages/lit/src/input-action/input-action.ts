import { LitElement, html, css } from 'lit';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';

@customElement('input-action')
export class InputAction extends LitElement {

  static override styles = css`
    :root {
      width: inherit;
      height: inherit;
      font-size: inherit;
    }
    .form-group input,
    .form-group button {
      padding: 0.3rem;
      font-size: inherit;
    }
    .form-group input {
      min-width: 400px;
    }
    .form-group button {
      cursor: pointer;
    }
  `;

  inputRef: Ref<HTMLInputElement> = createRef();

  @property({ type: String, reflect: true, attribute: true })
  method: string = 'GET';

  @property({ type: String, reflect: true, attribute: true })
  csrfToken: string | null | undefined = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");

  @property({ type: String, reflect: true, attribute: true })
  url: string = '';

  @property({ type: String, reflect: true, attribute: true })
  name: string = 'name';

  @property({ type: String, reflect: true, attribute: false })
  loading: boolean = false;

  @property({ type: String, reflect: true, attribute: true })
  actionText: string = 'Save';

  @property({ type: String, reflect: true, attribute: true })
  actionSavingText: string = 'Saving';

  async clickAction() {
    this.loading = true;
    try {
      const body = JSON.stringify({
        [this.name]: this.inputRef.value?.value
      });
      const resp = await fetch(this.url, {
        method: this.method,
        headers: this.csrfToken ? {
          'x-csrf-token': this.csrfToken,
          'content-type': 'application/json',
        } : {
          'content-type': 'application/json',
        },
        body,
      });
      const data = await resp.json();
      console.log(data);
      this.loading = false;
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  override render() {
    return html`
      <div class="form-group">
          <input type="text" ${ref(this.inputRef)} .value=${this.inputRef.value?.value ?? ''} ?disabled=${this.loading} />
          <button @click=${() => this.clickAction()} ?disabled=${this.loading}>
              ${this.loading ? this.actionSavingText : this.actionText}
          </button>
      </div>
    `;
  }
}


