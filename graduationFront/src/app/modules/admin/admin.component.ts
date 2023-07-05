import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { AdminService } from 'src/app/shared/utilities/services/Admin/admin.service';
import { AgencyService } from 'src/app/shared/utilities/services/Agency/agency.service';
import { SideBarToogleService } from 'src/app/shared/utilities/services/SideBarToggle/side-bar-toogle.service';
import { UsersService } from 'src/app/shared/utilities/services/Users/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  appForm: any;
  deleteForm: any;
  agencyForm: any;
  branchForm: any;

  citizenDonutChart: any;
  branchDonutChart: any;
  agencyDonutChart: any;

  citizensCount: any = 0;
  branchSupervisorsCount: any = 0;
  agencySupervisorsCount: any = 0;

  unapprovedAgencySupervisors: any = [];
  unapprovedBranchSupervisors: any = [];

  apps: any = [];

  selectedApp: any;
  appAddedSuccess: any;
  appExist: any;

  appDeletedSuccess: any;

  allAgencies: any = [];

  firstBranchClick = true;

  isOpen$ = this._sideBarToggleService.isOpen$;

  selectedImage: any;
  selectedImageName: string = '';

  constructor(
    private _http: HttpClient,
    private fb: FormBuilder,
    private _adminService: AdminService,
    private _usersService: UsersService,
    private _agencyService: AgencyService,
    private _sideBarToggleService: SideBarToogleService
  ) {
    this.agencyForm = this.fb.group({
      agencyName: ['', Validators.required],
      branches: this.fb.array([this.createBranch()])
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImageName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.selectedImage = event.target.result;
      };
    }
  }

  ngOnInit(): void {
    this.getTotalNumberOfEachUser();
    this.getAllUnapprovedAgencySupervisors();
    this.getAllUnapprovedBranchSupervisors();
    this.getAgencies();

    this.deleteForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.appForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      link: new FormControl('', [
        Validators.required,
        Validators.pattern(
          'https?://(www.)?[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z]{2,})'
        ),
      ]),
      cover: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      engName: new FormControl('', [Validators.required]),
    });

    this._http.get('http://127.0.0.1:8000/allApps/').subscribe({
      next: (response) => {
        console.log(response);
        this.apps = response;
      },
    });
  }

  createBranch(): FormGroup {
    this.branchForm = this.fb.group({
      branchName: ['', Validators.required],
      branchLocation: ['']
    });
    return this.branchForm;
  }

  createService(): FormGroup {
    return this.fb.group({
      serviceName: ['', Validators.required],
      serviceType: ['', Validators.required],
      documents: this.fb.array([]),
    });
  }

  createDocument(): FormGroup {
    return this.fb.group({
      documentName: ['', Validators.required],
    });
  }

  get branches(): FormArray {
    return this.agencyForm.get('branches') as FormArray;
  }

  addBranch() {
    this.branches.push(this.createBranch());

    this.firstBranchClick = false;
  }

  removeBranch(index: number) {
    this.branches.removeAt(index);
  }

  addService(branch: FormGroup) {
    const services = branch.get('services') as FormArray;
    services.push(this.createService());
  }

  removeService(branch: FormGroup, index: number) {
    const services = branch.get('services') as FormArray;
    services.removeAt(index);
  }

  addDocument(service: FormGroup) {
    const documents = service.get('documents') as FormArray;
    documents.push(this.createDocument());
  }

  removeDocument(service: FormGroup, index: number) {
    const documents = service.get('documents') as FormArray;
    documents.removeAt(index);
  }

  generateDonutChart(): void {
    this.citizenDonutChart = new Chart({
      chart: {
        type: 'pie',
        plotShadow: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
          innerSize: '80%',
          borderWidth: 0,
          borderColor: 'black',
          slicedOffset: 20,
        },
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'احصائيات',
      },
      legend: {
        enabled: true,
      },
      series: [
        {
          type: 'pie',
          data: [
            { name: 'عدد المواطنين', y: this.citizensCount, color: '#004f83' },
            {
              name: 'باقي عدد المستخدمين',
              y: this.branchSupervisorsCount + this.agencySupervisorsCount,
              color: '#e0e5ef',
            },
          ],
        },
      ],
    });

    this.branchDonutChart = new Chart({
      chart: {
        type: 'pie',
        plotShadow: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
          innerSize: '80%',
          borderWidth: 0,
          borderColor: 'black',
          slicedOffset: 20,
        },
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'احصائيات',
      },
      legend: {
        enabled: true,
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              name: 'عدد مديرين الفروع',
              y: this.branchSupervisorsCount,
              color: '#004f83',
            },
            {
              name: 'باقي عدد المستخدمين',
              y: this.citizensCount + this.agencySupervisorsCount,
              color: '#e0e5ef',
            },
          ],
        },
      ],
    });

    this.agencyDonutChart = new Chart({
      chart: {
        type: 'pie',
        plotShadow: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
          innerSize: '80%',
          borderWidth: 0,
          borderColor: 'black',
          slicedOffset: 20,
        },
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'احصائيات',
      },
      legend: {
        enabled: true,
      },
      series: [
        {
          type: 'pie',
          data: [
            {
              name: 'عدد مديرين الجهات',
              y: this.agencySupervisorsCount,
              color: '#004f83',
            },
            {
              name: 'باقي عدد المستخدمين',
              y: this.citizensCount + this.branchSupervisorsCount,
              color: '#e0e5ef',
            },
          ],
        },
      ],
    });
  }

  getTotalNumberOfEachUser() {
    this._usersService.getTotalNumberOfEachUser().subscribe(
      (response: any) => {
        this.citizensCount = response['citizensCount'];
        this.branchSupervisorsCount = response['branchSupervisorsCount'];
        this.agencySupervisorsCount = response['agencySupervisorsCount'];

        this.generateDonutChart();
      },
      (error) => {
        console.log(error)
      },
      () => {}
    );
  }

  getAllUnapprovedAgencySupervisors() {
    this._usersService.getAllUnapprovedAgencySupervisors().subscribe(
      (response: any) => {
        console.log(response);
        this.unapprovedAgencySupervisors = response;
      },
      (error) => {
        console.log(error)
      },
      () => {}
    );
  }

  getAllUnapprovedBranchSupervisors() {
    this._usersService.getAllUnapprovedBranchSupervisors().subscribe(
      (response: any) => {
        console.log(response);
        this.unapprovedBranchSupervisors = response;
        console.log(this.unapprovedBranchSupervisors);
      },
      (error) => {
        console.log(error)
      },
      () => {}
    );
  }

  deleteAgencySupervisorRow(supervisor: any) {
    const index = this.unapprovedAgencySupervisors.indexOf(supervisor);
    this.unapprovedAgencySupervisors.splice(index, 1);
    const userDetails = {
      govId: supervisor.govId,
    };

    this._usersService
      .deleteAgencySupervisorFromDatabase(userDetails)
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.log(error)
        },
        () => {}
      );
  }

  deleteBranchSupervisorRow(supervisor: any) {
    const index = this.unapprovedBranchSupervisors.indexOf(supervisor);
    this.unapprovedBranchSupervisors.splice(index, 1);

    const userDetails = {
      govId: supervisor.govId,
    };

    this._usersService
      .deleteBranchSupervisorFromDatabase(userDetails)
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.log(error)
        }
      );
  }

  approveAgencySupervisorRow(supervisor: any) {
    const index = this.unapprovedAgencySupervisors.indexOf(supervisor);
    this.unapprovedAgencySupervisors.splice(index, 1);
    const userDetails = {
      govId: supervisor.govId,
    };

    this._usersService.approveAgencySupervisor(userDetails).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error)
      },
      () => {}
    );
  }

  approveBranchSupervisorRow(supervisor: any) {
    const index = this.unapprovedBranchSupervisors.indexOf(supervisor);
    this.unapprovedBranchSupervisors.splice(index, 1);
    const userDetails = {
      govId: supervisor.govId,
    };

    this._usersService.approveBranchSupervisor(userDetails).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAgencies() {
    this._agencyService.getAgenciesForAdmin().subscribe(
      (response: any) => {
        console.log(response);
        this.allAgencies = response;
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  createAgency() {
    const requestBody = {
      agencyName: this.agencyForm.value.agencyName,
      branches: this.agencyForm.value.branches,
    };
    this._agencyService.createAgency(requestBody).subscribe(
      (response: any) => {
        console.log(response);
        this.agencyForm.reset();
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  scrollToSection(element: HTMLElement): void {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goToSection(id: any) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.log('in else ', id);
    }
  }

  addApp() {
    if (!this.appForm.valid) {
      this.appForm.markAllAsTouched();
    } else {
      let app = {
        name: this.appForm.value.name,
        rate: this.appForm.value.rate,
        link: this.appForm.value.link,
        description: this.appForm.value.description,
        cover: this.appForm.value.cover,
        englishName: this.appForm.value.engName,
      };

      this._adminService.addApp(app).subscribe(
        (response) => {
          console.log(response);
          this.appForm.reset();
          this.selectedImage = '';

          this.goToSection('alert3');

          if (response == 'Added Successfully!!') {
            this.appAddedSuccess = 1;

            setTimeout(() => {
              this.appAddedSuccess = 0;
            }, 3000);
          } else {
            this.appExist = 1;

            setTimeout(() => {
              this.appExist = 0;
            }, 3000);
          }
        },
        (error) => {
          console.log(error)
        }
      );
    }
  }

  onChangeApp(event: any) {
    this.selectedApp = event.target.value;
  }

  deleteApp() {
    let name = { name: this.selectedApp };

    this._adminService.deleteApp(name).subscribe(
      (response) => {
        console.log(response);
        this.deleteForm.reset();
        let indx = this.apps.indexOf(this.selectedApp);
        this.apps.splice(indx, 1);

        this.goToSection('alert4');

        this.appDeletedSuccess = 1;

        setTimeout(() => {
          this.appDeletedSuccess = 0;
        }, 3000);
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
