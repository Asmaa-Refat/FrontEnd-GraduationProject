import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ServiceDetailsService } from './../../shared/utilities/services/ServiceDetails/service-details.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/utilities/services/Users/users.service';
import { AgencyService } from 'src/app/shared/utilities/services/Agency/agency.service';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss'],
})
export class ViewDocumentComponent implements OnInit {
  userType : any
  services: any = [];
  searchQuery: string = '';
  servicesFilter: any[] = [];
  searchForm: any;
  filterResult: boolean = false;
  noData: boolean = false;
  buttonClicked: boolean = false;

  normalizedServiceName: any;
  queryTemp: any

  editClicked: boolean = false
  editServiceForm:any
  agencyName = localStorage.getItem('agencyName')

  allDocuments:any = []

  documentClicked: string[] = [];
  documentClickedDic: any[] = [];

  showSuccessAlert = 0;
  showDangerAlert = 0;


  constructor(private _agencyService:AgencyService,private _serviceDetailsService: ServiceDetailsService,private fb: FormBuilder, private _usersService :UsersService) {
    this.editServiceForm = this.fb.group({
      serviceName: ['', Validators.required],
      documents: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType')
    if (this.userType == 'agencySupervisor'){
      this.getAllServicesForAgencySupervisor()
      this.getAllDocuments()
    }
    else if (this.userType == 'citizen'){
      this.getAllServices();
    }
    
    this.searchForm = new FormGroup({
      searchControl: new FormControl(''),
    });

    setInterval(() => {
      this.checkSearchQuery();
    }, 500);

    this.filterResult = false;
  

  }

  checkSearchQuery(){
    if (this.searchQuery === '') {
      this.servicesFilter = this.services;
    }
  }

  getAllServices() {
    this._serviceDetailsService.getAllServices().subscribe(
      (response: any) => {
        this.services = response;
        console.log(this.services);
      },
      (error: any) => {
        console.log(error), alert('something went wrong!!!');
      }
    );
  }

  getAllServicesForAgencySupervisor(){
    let requestBody = {
      "govId" : localStorage.getItem('govId')

    }
    this._usersService.getAllAgencyServicesForAgencySupervisor(requestBody).subscribe(
      (response)=>{
        this.services = response
        console.log(response);
      }
      ,
      (error)=>{
        console.log(error);
        
      }
    )
  }

  toggleList(service: any) {
    service.displayDocuments = !service.displayDocuments;
    
  }

  hasPattern(str: string, pattern: string): boolean {
    return str.includes(pattern);
  }
 
  filterServices() {
    this.searchQuery = this.searchForm.value.searchControl;

    this.queryTemp = this.removeArabicDiacritics(this.searchQuery);

    if (this.queryTemp === '') {
      this.servicesFilter = this.services;
    } else {
      this.servicesFilter = this.services.filter(
        (service: { name: string }) => {
         
          this.normalizedServiceName = this.removeArabicDiacritics(service.name)        
          return this.normalizedServiceName.includes(this.queryTemp) 
          //service.name.includes(this.searchQuery)
        });
    }
    if (this.servicesFilter.length > 0) {
      console.log(this.servicesFilter);
      this.noData = false;
    } else {
      console.log('No matching data found.');
      this.noData = true;
    }
    this.filterResult = true;
  }

  removeArabicDiacritics(str: any) {
    str = str.replace(/[\u064B-\u065F\u0670]|/g, ''); //التشكيل
    str = str.replace(/ة/g, 'ه');
    str = str.replace(/ي|ئ/g ,'ى');
    str = str.replace(/[إأٱآا]/g ,'ا');
    return str;
  }

  removeDocument(index: number) {
    this.documents.removeAt(index);
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

  addDocument() {
    this.documents.push(this.createDocument());
  }
  
  addExistingDocumentToNewService(service:any, document: any){
   
    let response = {
      'name': document
    }

    this.documentClicked.push(document)
    this.documentClickedDic.push(response);
    service.documents.push(response)

    
  }

  removeTheDocumentFromTheNewService(document: any) {
    const index = this.documentClicked.indexOf(document);    
    if (index > -1) {
      this.documentClicked.splice(index, 1);
    }
  
    this.documentClickedDic = this.documentClickedDic.filter(item => item.name !== document);
  }

  createDocument(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  get documents(): FormArray {
    return this.editServiceForm.get('documents') as FormArray;
  }

  updateService(service:any){
    this.documentClickedDic =  this.documentClickedDic.concat(service.documents)
    this.documentClickedDic =  this.documentClickedDic.concat(this.editServiceForm.value.documents)
    console.log(this.documentClickedDic);
    
    const requestBody = {
      name : service.name,
      documents : this.documentClickedDic
    }
    
    this._agencyService.updateService(requestBody).subscribe(
      (response: any) => {
        
        if(response == 'Updates Saved!!'){

          this.editServiceForm.reset();
          this.documentClicked = []
          this.documentClickedDic = []
          this.showSuccessAlert = 1;
          this.goToSection('alert')
          setTimeout(() => {
            this.showSuccessAlert = 0;
          }, 3000);

        }
        else{

          this.editServiceForm.reset();
          this.documentClicked = []
          this.documentClickedDic = []
          this.showDangerAlert = 1;
          this.goToSection('alert')
          setTimeout(() => {
            this.showDangerAlert = 0;
          }, 3000);

        }
        
      },
      (error) => {
        console.log(error), alert('something went wrong');
      }
    );
  }

  toggle(service:any){
    service.documentFormAppears = !service.documentFormAppears    
  }

  removeExistingDocument(serviceIndex: any, documentIndex: any){  
      
    if (this.filterResult == false){   
    let serviceObj = this.services[serviceIndex]    
    serviceObj['documents'].splice(documentIndex, 1);
   
    }
    else{
      
    let serviceObj = this.servicesFilter[serviceIndex]    
    serviceObj['documents'].splice(documentIndex, 1);
    }

  }
  goToSection(id: any) {
    const element = document.getElementById(id);
     if (element) {
       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
     }
     else {
       console.log("in else ", id);

     }
 }


}
