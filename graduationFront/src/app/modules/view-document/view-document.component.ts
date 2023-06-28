import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/shared/utilities/services/Documents/document.service';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

  serviceName : any =  "الحصول على البطاقة الشخصية طبقاً للرقم القومي"
  documents:any = []

  constructor(private _documentService : DocumentService) { }

  ngOnInit(): void {
    this.getDocumentsForService()
  }

  getDocumentsForService(){
    this._documentService.getDocumentsForService(this.serviceName).subscribe(
      (response: any) => {
        this.documents = response['documents']
        console.log(this.documents)  
      },
      (error) => {
        console.log(error), alert('something went wrong!!!');
      },
    );
  }

  toggleList() {
    var list = document.getElementById("documentList") as HTMLElement;
    list.style.display = (list.style.display === "none") ? "block" : "none";
  }




}
