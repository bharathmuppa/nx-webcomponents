import {
  DocumentService,
  IDocumentService,
} from '@webade-web-components/core-services';

export class PictorialContainer extends HTMLElement {
  private documentData: any[];
  private _documentService?: IDocumentService;
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
    const documentService = new DocumentService();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const pictorialTemplate = document.createElement('template');
    pictorialTemplate.innerHTML = `
    <style>
.pictorial-container{
display:flex;
flex-flow: row wrap;
}
    </style>
    <h3 id="pictorial-header">
    ${this.header} 
    <h3>
    <div class="pictorial-container" id="pictorial-container" >
    </div>
<div>
</div>
    `;
    shadowRoot.appendChild(pictorialTemplate.content.cloneNode(true));
    setTimeout(() => {
      this.documentData = this._documentService.createDocuments();

      this.shadowRoot.querySelector(
        '#pictorial-container'
      ).innerHTML = ` ${this.documentData
        .map(
          (document) =>
            `<webade-pictorial header="${document.name}"></webade-pictorial>`
        )
        .join('')}`;
    }, 1000);
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('pictorialSelect', (ele) => {
      console.log(ele);
    });
  }
}

if (!customElements.get('pictorial-container')) {
  customElements.define('pictorial-container', PictorialContainer);
}
