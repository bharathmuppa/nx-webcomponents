import { Component, OnInit } from '@angular/core';
import { DocumentService } from '@webade-web-components/core-services';

@Component({
  selector: 'webade-web-components-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  pictorialHeader = 'Series Information';
  public documentService: DocumentService;
  public selectedPictorial: string;
  constructor() {
    this.documentService = new DocumentService();
  }

  ngOnInit(){
    document.addEventListener('pictorialSelect',(ele: CustomEvent)=>{
  
    this.selectedPictorial = ele.detail;
    })
  }

}
