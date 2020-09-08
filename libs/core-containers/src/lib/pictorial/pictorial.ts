const template  = `
<style>
:host{
    box-sizing: border-box;
}
.pictorial{
    width : 100px;
    height: 100px;
    background: var(--primary,black);
    display: inline-block;
    text-align: center;
    margin: 1rem;
    color: white;
}
</style>
<div class="pictorial" id="pictorial" ></div>
`

export class Pictorial extends HTMLElement {

  private selectEvent: CustomEvent;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const pictorialTemplate = document.createElement('template');
    pictorialTemplate.innerHTML = template ;

    shadowRoot.appendChild(pictorialTemplate.content.cloneNode(true));
    shadowRoot.querySelector('#pictorial').innerHTML = this.getAttribute("header");
  }

  pictorialSelected() {
    this.dispatchEvent(
      new CustomEvent('pictorialSelect', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this.getAttribute("header"),
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
