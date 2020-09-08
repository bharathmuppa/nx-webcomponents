const template = `
<style>
:host{
    box-sizing: border-box;
    width : 100px;
    height: 100px;
    display: inline-block;
    text-align: center;
    margin: 1rem;
    color: white;
}
img{
    max-width: 100px;
    max-height: 70px;
    width: 100px;
    height: 70px;
  }
 #pictorial{
    width : 100px;
    height: 100px; 
 } 
</style>

<div  id="pictorial">
<img alt="dicom-image" id="avatar"/>
<span class="pictorial" >
</span>
</div>

`;

export class Pictorial extends HTMLElement {
  private selectEvent: CustomEvent;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const pictorialTemplate = document.createElement('template');
    pictorialTemplate.innerHTML = template;

    shadowRoot.appendChild(pictorialTemplate.content.cloneNode(true));
    shadowRoot.querySelector('.pictorial').innerHTML = this.getAttribute(
      'header'
    );
    shadowRoot
      .querySelector('#avatar')
      .setAttribute('src', this.getAttribute('avatar'));
  }

  pictorialSelected() {
    this.dispatchEvent(
      new CustomEvent('pictorialItemSelect', {
        bubbles: true,
        cancelable: false,
        composed: false,
        detail: {
          id: this.getAttribute('header'),
          pic: this.getAttribute('avatar'),
        },
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
