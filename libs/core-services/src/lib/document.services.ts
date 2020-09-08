import { IDocumentService } from './document.model';

export class DocumentService implements IDocumentService{
  
  createDocuments(): any[]{
       return [{
           name: 'pic1',
           id: 1,
           seriesId: 'series1',
           modality: 'MR',
           pic: './assets/img1.jpg'
       },
       {
        name: 'pic2',
        id: 2,
        seriesId: 'series2',
        modality: 'MR',
        pic: './assets/img2.jpg'
    },
    {
        name: 'pic3',
        id: 3,
        seriesId: 'series3',
        modality: 'MR',
        pic: './assets/img3.jpg'
    },
    {
        name: 'pic4',
        id: 4,
        seriesId: 'series4',
        modality: 'MR',
        pic: './assets/img4.jpg'
    },
    {
        name: 'pic5',
        id: 5,
        seriesId: 'series5',
        modality: 'MR',
        pic: './assets/img5.jpg'
    }]
  }
}