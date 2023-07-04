import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  allDocuments: any = [];
  documentsOfNewService: any = [];

  branchForm: any;
  serviceForm: any;

  documentClicked: string[] = [];
  documentClickedDic: any[] = [];

  showAlert: any = 0;
  showAgencyNameAlert: any = 0;
  showServiceNameAlert: any = 0;
  showBranchSuccessAlert: any = 0;
  showBranchExistAlert: any = 0;

  agencyName = localStorage.getItem('agencyName');

  isOpen$ = this._sideBarToggleService.isOpen$;

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
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      location: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    });
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

  addService() {
    this.documentClickedDic = this.documentClickedDic.concat(
      this.serviceForm.value.documents
    );
    console.log(this.documentClickedDic);

    const requestBody = {
      agencyName: this.agencyName,
      serviceName: this.serviceForm.value.serviceName,
      documents: this.documentClickedDic,
    };

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

  addBranch() {
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
