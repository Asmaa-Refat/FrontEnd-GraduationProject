import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ServiceDetailsService } from './../../shared/utilities/services/ServiceDetails/service-details.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/utilities/services/Users/users.service';

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

  documentFormAppears = false


  constructor(private _serviceDetailsService: ServiceDetailsService,private fb: FormBuilder, private _usersService :UsersService) {
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

  editService(service:any){
    this.editClicked = true
    this.toggleList(service)
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

  createDocument(): FormGroup {
    return this.fb.group({
      documentName: ['', Validators.required],
    });
  }

  get documents(): FormArray {
    return this.editServiceForm.get('documents') as FormArray;
  }

  updateService(){
    this.documentClickedDic =  this.documentClickedDic.concat(this.editServiceForm.value.documents)
    console.log(this.documentClickedDic);
    
    const requestBody = {
      agencyName : this.agencyName,
      serviceName : this.editServiceForm.value.serviceName,
      documents : this.documentClickedDic
    }
    this.documentFormAppears = false

   /* this._agencyService.addServiceForAgency(requestBody).subscribe(
      (response: any) => {
        console.log(response)
        if(response == 'Added Successfully!!') 
        {
          let dic = {
            "name": this.serviceForm.value.serviceName,
            "branches" : []
          }
          this.agencyServices.push(dic)
          console.log(this.agencyServices);
          
        
          this.serviceForm.reset();
          this.documentClicked = []
          this.documentClickedDic = []
          this.showAlert = 1;
          this.goToSection('alert')
          setTimeout(() => {
            this.showAlert = 0;
          }, 3000);
        }
        else if(response == 'Error: Service Name Already Exit')
        {
          this.serviceForm.reset();
          this.documentClicked = []
          this.documentClickedDic = []
          this.showServiceNameAlert = 1;
          this.goToSection('alert')
          setTimeout(() => {
            this.showServiceNameAlert = 0;
          }, 3000);
        }
        else if (response == "Error: Agency Name Does't Exsit"){
          this.serviceForm.reset();
          this.documentClicked = []
          this.documentClickedDic = []
          this.showAgencyNameAlert = 1;
          this.goToSection('alert')
          setTimeout(() => {
            this.showAgencyNameAlert = 0;
          }, 3000);
        }
      },
      (error) => {
        console.log(error), alert('something went wrong');
      }
    );*/
  }

  addAnotherDocument(){
    this.documentFormAppears = true
  }


}
