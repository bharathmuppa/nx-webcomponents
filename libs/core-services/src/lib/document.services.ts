import { IDocumentService } from './document.model';

export class DocumentService implements IDocumentService{
  
  createDocuments(): any[]{
       return [{
           name: 'pic1',
           id: 1,
           seriesId: 'series1',
           modality: 'MR'
       },
       {
        name: 'pic2',
        id: 2,
        seriesId: 'series2',
        modality: 'MR'
    },
    {
        name: 'pic3',
        id: 3,
        seriesId: 'series3',
        modality: 'MR'
    },
    {
        name: 'pic4',
        id: 4,
        seriesId: 'series4',
        modality: 'MR'
    }]
  }
}