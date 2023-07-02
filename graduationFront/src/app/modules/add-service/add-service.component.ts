import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgencyService } from 'src/app/shared/utilities/services/Agency/agency.service';
import { UsersService } from 'src/app/shared/utilities/services/Users/users.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  agencyServices:any = []
  services:any = []
  allDocuments:any = []
  documentsOfNewService: any = []

  documentClicked: string[] = [];
  documentClickedDic: any[] = [];

  showAlert: any = 0
  serviceForm: any;

  agencyName = localStorage.getItem('agencyName')
  

  constructor(private fb: FormBuilder, private _usersService: UsersService, private _agencyService: AgencyService,) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      documents: this.fb.array([]),
    });
   }

  ngOnInit(): void {
    console.log(this.agencyServices.length);
    this.getAllAgencyServicesForAgencySupervisor()
    console.log(this.agencyServices.length);
    this.getAllDocuments()
    
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
    this.documentClickedDic =  this.documentClickedDic.concat(this.serviceForm.value.documents)
    console.log(this.documentClickedDic);
    
    const requestBody = {
      agencyName : this.agencyName,
      serviceName : this.serviceForm.value.serviceName,
      documents : this.documentClickedDic
    }

    this._agencyService.addServiceForAgency(requestBody).subscribe(
      (response: any) => {
        console.log(response)
        if(response == 'Added Successfully!!') 
        {
          this.agencyServices.push(this.serviceForm.value.serviceName)
          this.serviceForm.reset();
          this.showAlert = 1;
          setTimeout(() => {
            this.showAlert = 0;
          }, 2000);
        }
      },
      (error) => {
        console.log(error), alert('something went wrong');
      }
    );
  }

  generateServices() {
    throw new Error('Method not implemented.');
  }

  onSelectService(event :any){

  }

  getAllAgencyServicesForAgencySupervisor(){
    const requestBody = {
      "govId": localStorage.getItem('govId')
    }
    this._usersService.getAllAgencyServicesForAgencySupervisor(requestBody).subscribe(
      (response: any) => {
        console.log(response)
        if(response != 'services list in agency is empty') 
        {
          this.agencyServices = response
        }
      },
      (error) => {
        console.log(error), alert('something went wrong');
      }
    );
  }

  getAllDocuments(){
    this._usersService.getAllDocuments().subscribe(
      (response: any) => {
        console.log(response)
        const sortedArabicStrings = response.sort((a: any, b: any) => a.localeCompare(b, 'ar'));
        
        this.allDocuments = sortedArabicStrings;
      },
      (error) => {
        console.log(error), alert('something went wrong');
      }
    );
  }


  addExistingDocumentToNewService(document: any){
    let response = {
      'documentName': document
    }

    this.documentClicked.push(document)
    this.documentClickedDic.push(response);
  }

  removeTheDocumentFromTheNewService(document: any) {
    const index = this.documentClicked.indexOf(document);    
    if (index > -1) {
      this.documentClicked.splice(index, 1);
    }
  
    this.documentClickedDic = this.documentClickedDic.filter(item => item.documentName !== document);
  }
 
 
 
}
