import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  services:any = []
  showAlert: any = 0
  serviceForm: any;

  agencyName = localStorage.getItem('agencyName')
  

  constructor(private fb: FormBuilder,) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      documents: this.fb.array([]),
    });
   }

  ngOnInit(): void {

   

  }
  createDocument(): FormGroup {
    return this.fb.group({
      documentName: ['', Validators.required],
    });
  }

  get documents(): FormArray {
    return this.serviceForm.get('documents') as FormArray;
  }

  addDocument() {
    this.documents.push(this.createDocument());
  }
  
  removeDocument(index: number) {
    this.documents.removeAt(index);
  }

  addService(){
    console.log(this.serviceForm.value.serviceName)
    console.log(this.serviceForm.value.documents)


  }

  generateServices() {
    throw new Error('Method not implemented.');
  }

  onSelectService(event :any){

  }



}
