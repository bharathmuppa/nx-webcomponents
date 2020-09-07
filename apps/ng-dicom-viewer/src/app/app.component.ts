import { Component } from '@angular/core';
import { DocumentService } from '@webade-web-components/core-services';

@Component({
  selector: 'webade-web-components-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-dicom-viewer';
  public documentService: DocumentService;
  constructor() {
    this.documentService = new DocumentService();
    
  }
}
