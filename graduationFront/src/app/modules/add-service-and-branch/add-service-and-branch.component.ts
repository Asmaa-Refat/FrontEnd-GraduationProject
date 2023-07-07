import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { error } from 'jquery';
import { AgencyService } from 'src/app/shared/utilities/services/Agency/agency.service';
import { BranchService } from 'src/app/shared/utilities/services/Branch/branch.service';
import { SideBarToogleService } from 'src/app/shared/utilities/services/SideBarToggle/side-bar-toogle.service';
import { UsersService } from 'src/app/shared/utilities/services/Users/users.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service-and-branch.component.html',
  styleUrls: ['./add-service-and-branch.component.scss'],
})
export class AddServiceAndBranchComponent implements OnInit {
  agencyServices: any = [];
  services: any = [];
  branchesNames:any = []

  allDocuments: any = [];
  documentsOfNewService: any = [];

  branchForm: any;
  serviceForm: any;

  searchDocumentQuery: any = ''

  documentClicked: string[] = [];
  documentClickedDic: any[] = [];

  showAlert: any = 0;
  showAgencyNameAlert: any = 0;
  showServiceNameAlert: any = 0;
  showBranchSuccessAlert: any = 0;
  showBranchExistAlert: any = 0;
  showDeletingBranchSuccessAlert: any = 0;
  showRequiredlert:any = 0;

  targetDeletedBranch:any

  agencyName = localStorage.getItem('agencyName');

  isOpen$ = this._sideBarToggleService.isOpen$;
  documentsIsEmpty :boolean = false

  searchDocumentsForm:any
  queryDocumentTemp:any
  normalizedDocumentName:any
  filterDocumentResult:any = false

  documentsFilter:any = []
  noData:any

  constructor(
    private _sideBarToggleService: SideBarToogleService,
    private fb: FormBuilder,
    private _usersService: UsersService,
    private _agencyService: AgencyService,
    private _branchService: BranchService
  ) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      documents: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    console.log(this.agencyServices.length);
    this.getAllAgencyServicesForAgencySupervisor();
    console.log(this.agencyServices.length);
    this.getAllDocuments();
    this.getAllBranches();

    this.isOpen$.subscribe((isOpen: any) => {
      const content = document.getElementById('main-content') as HTMLElement;
      if (isOpen) {
        content.style.transform = 'translateX(-20px)';
        content.style.width = '90%';
      } else {
        content.style.transform = 'none';
        content.style.width = '100%';
      }
    });

    this.branchForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      location: new FormControl('', [
        Validators.required
      ]),
    });

    setInterval(() => {
      this.checkSearchQuery();
    }, 500);

    this.searchDocumentsForm = new FormGroup({
      searchDocuments: new FormControl(''),
    });
  }

  checkSearchQuery() {
    if(this.searchDocumentQuery === ''){
      this.documentsFilter = this.allDocuments
    }
  }

  filterDocuments(){

    this.searchDocumentQuery = this.searchDocumentsForm.value.searchDocuments;
   
    this.queryDocumentTemp = this.removeArabicDiacritics(this.searchDocumentQuery);
    
    if (this.queryDocumentTemp === '') {
      this.documentsFilter = this.allDocuments;
    } else {
      this.documentsFilter = this.allDocuments.filter(
        (document: any ) => {
          this.normalizedDocumentName = this.removeArabicDiacritics(
            document
          );
          return this.normalizedDocumentName.includes(this.queryDocumentTemp);
        }
      );
    }
    if (this.documentsFilter.length > 0) {
      console.log(this.documentsFilter);
      this.noData = false;
    } else {
      console.log('No matching data found.');
      this.noData = true;
    }
    this.filterDocumentResult = true;

  }

  removeArabicDiacritics(str: any) {
    str = str.replace(/[\u064B-\u065F\u0670]|/g, ''); //التشكيل
    str = str.replace(/ة/g, 'ه');
    str = str.replace(/ي|ئ/g, 'ى');
    str = str.replace(/[إأٱآا]/g, 'ا');
    return str;
  }

  createDocument(): FormGroup {
    return this.fb.group({
      documentName: [''],
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

  addService() {

    if (!this.serviceForm.valid){
      this.serviceForm.markAllAsTouched();
      this.goToSection('serviceName');
    }
    else{
      this.documentClickedDic = this.documentClickedDic.concat(
        this.serviceForm.value.documents
      );
      console.log(this.documentClickedDic);
      if(this.documentClickedDic.length == 0){
        this.documentsIsEmpty = true
        this.goToSection('documentsAlert');
            setTimeout(() => {
              this.documentsIsEmpty = false;
            }, 3000);
      }
      else{
        
      const requestBody = {
        agencyName: this.agencyName,
        serviceName: this.serviceForm.value.serviceName,
        documents: this.documentClickedDic,
      };
      console.log(requestBody);
      

      this._agencyService.addServiceForAgency(requestBody).subscribe(
        (response: any) => {
          console.log(response);
          if (response == 'Added Successfully!!') {
            let dic = {
              name: this.serviceForm.value.serviceName,
              branches: [],
            };
            this.agencyServices.push(dic);
            console.log(this.agencyServices);

            this.serviceForm.reset();
            this.documentClicked = [];
            this.documentClickedDic = [];
            this.showAlert = 1;
            this.goToSection('alert');
            setTimeout(() => {
              this.showAlert = 0;
            }, 3000);
          } else if (response == 'Error: Service Name Already Exit') {
            this.serviceForm.reset();
            this.documentClicked = [];
            this.documentClickedDic = [];
            this.showServiceNameAlert = 1;
            this.goToSection('alert');
            setTimeout(() => {
              this.showServiceNameAlert = 0;
            }, 3000);
          } else if (response == "Error: Agency Name Does't Exsit") {
            this.serviceForm.reset();
            this.documentClicked = [];
            this.documentClickedDic = [];
            this.showAgencyNameAlert = 1;
            this.goToSection('alert');
            setTimeout(() => {
              this.showAgencyNameAlert = 0;
            }, 3000);
          }
        },
        (error) => {
          console.log(error), alert('something went wrong');
        }
      );
      }
  }
  }

  addBranch() {

    if (!this.branchForm.valid) {  
      this.branchForm.markAllAsTouched();
    }
    else{
      
      const requestBody = {
        branchName: this.branchForm.value.name,
        location: this.branchForm.value.location,
        agencyName: this.agencyName,
      };
    
      this._branchService.addBranch(requestBody).subscribe(
        (response: any) => {
          console.log(response);
          if (response == 'Branch created successfully') 
          {
            this.showBranchSuccessAlert = 1;
            this.branchForm.reset();

            this.goToSection('alert2');
            setTimeout(() => {
              this.showBranchSuccessAlert = 0;
            }, 3000);

          } 
          else if (response == 'Branch already exists!') 
          {
            this.showBranchExistAlert = 1;
            this.branchForm.reset();

            this.goToSection('alert2');
            setTimeout(() => {
              this.showBranchExistAlert = 0;
            }, 3000);
          }
        },
        (error) => {
          console.log(error), alert('something went wrong');
        }
      );
    }
  }

  getAllBranches(){
    let requestBody = {
      agencyName:this.agencyName
    }
    this._agencyService.getBranchesForAgency(requestBody).subscribe(
      (response:any)=>{
        console.log(response);
        this.branchesNames = response
        
      }
      ,(error)=>{
        console.log(error);
        
      }
    )
  }
  onChangeBranch(event:any){
    this.targetDeletedBranch = event.target.value
  }

  deleteBranch(){

    let requestBody = {
      branchName: this.targetDeletedBranch
    }
        
    this._branchService.deleteBranch(requestBody).subscribe(
      (response)=>{
       
        if (response == 'Branch deleted successfully') 
        {
          this.showDeletingBranchSuccessAlert = 1;
          let index = this.branchesNames.indexOf(this.targetDeletedBranch)
          this.branchesNames.splice(index, 1)
          this.goToSection('alert3');
          setTimeout(() => {
            this.showDeletingBranchSuccessAlert = 0;
          }, 3000);

        } 
        else{

          this.showRequiredlert = 1;
          this.goToSection('alert3');
          setTimeout(() => {
            this.showRequiredlert = 0;
          }, 3000);

        }
      }
      ,(error)=>{
        console.log(error);
        
      }
    )
  }

  generateServices() {
    throw new Error('Method not implemented.');
  }

  getAllAgencyServicesForAgencySupervisor() {
    const requestBody = {
      agencyName: this.agencyName,
    };

    this._usersService
      .getAllAgencyServicesForAgencySupervisor(requestBody)
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response != 'services list in agency is empty') {
            this.agencyServices = response;
          }
        },
        (error) => {
          console.log(error), alert('something went wrong');
        }
      );
  }

  getAllDocuments() {
    this._usersService.getAllDocuments().subscribe(
      (response: any) => {
        console.log(response);
        const sortedArabicStrings = response.sort((a: any, b: any) =>
          a.localeCompare(b, 'ar')
        );

        this.allDocuments = sortedArabicStrings;
      },
      (error) => {
        console.log(error), alert('something went wrong');
      }
    );
  }

  addExistingDocumentToNewService(document: any) {
    let response = {
      documentName: document,
    };

    this.documentClicked.push(document);
    this.documentClickedDic.push(response);
  }

  removeTheDocumentFromTheNewService(document: any) {
    const index = this.documentClicked.indexOf(document);
    if (index > -1) {
      this.documentClicked.splice(index, 1);
    }

    this.documentClickedDic = this.documentClickedDic.filter(
      (item) => item.documentName !== document
    );
  }

  goToSection(id: any) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.log('in else ', id);
    }
  }
}
