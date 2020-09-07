export class Pictorial extends HTMLElement {
  static get observedAttributes() {
    return ['header'];
  }
 
  get header() {
    return this.getAttribute('header');
  }
  set header(val) {
    if (val) {
      this.setAttribute('header', val);
    } else {
      this.removeAttribute('header');
    }
  }

  private selectEvent: CustomEvent;

  constructor() {
    super();
    const name = 'hello world';
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const pictorialTemplate = document.createElement('template');
    pictorialTemplate.innerHTML = `
          <style>
          :host {  }
          .pictorial{
              width : 100px;
              height: 100px;
              background: black;
              display: inline-block;
              text-align: center;
              margin: 1rem;
              color: white;
          }
          </style>
          <div class="pictorial" id="pictorial" >${this.header}</div>
        
        `;

    shadowRoot.appendChild(pictorialTemplate.content.cloneNode(true));
  }

  pictorialSelected() {
    console.log(this.header);
    this.dispatchEvent(
      new CustomEvent('pictorialSelect', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this.header,
      })
    );
  }

  connectedCallback() {
    this.shadowRoot.getElementById(
      'pictorial'
    ).onclick = this.pictorialSelected.bind(this);
  }
}

if (!customElements.get('webade-pictorial')) {
  customElements.define('webade-pictorial', Pictorial);
}
