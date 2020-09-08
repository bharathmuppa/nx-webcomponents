import { IDocumentService } from '@webade-web-components/core-services';

const template = `
<style>
:host{
  box-sizing: border-box;
}
.pictorial-container{
display:flex;
flex-flow: row wrap;
}
.active{
 border:1px solid red;
}

</style>
<h3 id="pictorial-header">
<h3>
<div class="pictorial-container" id="pictorial-container" >
</div>
<div>
</div>
`;

export class PictorialContainer extends HTMLElement {
  private documentData: any[];
  private _documentService?: IDocumentService;
  private onPictorialSelectFnDef;
  static get observedAttributes() {
    return ['header', 'documentService'];
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

  public set documentService(value: IDocumentService | undefined) {
    this._documentService = value;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'header':
          this.setAttribute(name, newValue);
          this.shadowRoot.getElementById(
            'pictorial-header'
          ).innerText = newValue;
          break;
        case 'documentService':
          console.log(newValue);
          this.setAttribute(name, newValue);
          break;
        default:
          break;
      }
    }
  }

  constructor() {
    super();

    this.onPictorialSelectFnDef = this.onPictorialSelect.bind(this);

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const pictorialTemplate = document.createElement('template');

    pictorialTemplate.innerHTML = template;

    shadowRoot.appendChild(pictorialTemplate.content.cloneNode(true));

    // Just to emulate asynchronous behavior
    setTimeout(() => {
      this.documentData = this._documentService.createDocuments();

      if (!this.documentData) {
        return;
      }

      this.shadowRoot.querySelector(
        '#pictorial-container'
      ).innerHTML = ` ${this.documentData
        .map(
          (document) =>
            `<webade-pictorial header="${document.name}" id="${document.name}" avatar="${document.pic}">
            </webade-pictorial>`
        )
        .join('')}`;
    }, 1000);
  }

  connectedCallback() {
    this.shadowRoot.addEventListener(
      'pictorialItemSelect',
      this.onPictorialSelectFnDef
    );
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener(
      'pictorialItemSelect',
      this.onPictorialSelectFnDef
    );
  }

  onPictorialSelect(ele) {
    console.log(ele);
    const id = '#' + ele.detail.id;

    // logic to deselect the
    this.shadowRoot.querySelectorAll('webade-pictorial').forEach((ele) => {
      ele.classList.remove('active');
    });
    this.shadowRoot.querySelector(id).classList.add('active');

    this.dispatchEvent(
      new CustomEvent('pictorialSelect', {
        bubbles: true,
        cancelable: false,
        composed: false,
        detail: ele.detail,
      })
    );
  }
}

if (!customElements.get('pictorial-container')) {
  customElements.define('pictorial-container', PictorialContainer);
}
