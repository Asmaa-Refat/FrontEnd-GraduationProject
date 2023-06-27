import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'angular-highcharts';
import { AgencyService } from 'src/app/shared/utilities/services/Agency/agency.service';
import { SideBarToogleService } from 'src/app/shared/utilities/services/SideBarToggle/side-bar-toogle.service';
import { UsersService } from 'src/app/shared/utilities/services/Users/users.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  citizenDonutChart: any
  branchDonutChart: any
  agencyDonutChart: any

  citizensCount: any = 0
  branchSupervisorsCount: any = 0
  agencySupervisorsCount: any = 0

  unapprovedAgencySupervisors: any = []
  unapprovedBranchSupervisors: any = []

  allAgencies: any = []

  agencyForm: any;

  firstBranchClick = true

  isOpen$ = this._sideBarToggleService.isOpen$;

  constructor(private fb: FormBuilder, private _usersService: UsersService, private _agencyService: AgencyService, private _sideBarToggleService: SideBarToogleService) {
    this.agencyForm = this.fb.group({
      agencyName: ['', Validators.required],
      branches: this.fb.array([])
    });
  }

  createBranch(): FormGroup {
    return this.fb.group({
      branchName: ['', Validators.required],
      services: this.fb.array([])
    });
  }

  createService(): FormGroup {
    return this.fb.group({
      serviceName: ['', Validators.required],
      serviceType: ['', Validators.required],
      documents: this.fb.array([])
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

    this.firstBranchClick = false

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
  ngOnInit(): void {
    this.getTotalNumberOfEachUser();
    this.getAllUnapprovedAgencySupervisors();
    this.getAllUnapprovedBranchSupervisors();
    this.getAgencies();

    this.isOpen$.subscribe(isOpen => {
      const mainContentElement = document.getElementById('main-content') as HTMLElement;
      if (isOpen) {
        mainContentElement.style.transform = 'translateX(-90px)';
        mainContentElement.style.width = '95%';
      } else {
        mainContentElement.style.transform = 'none';
        mainContentElement.style.width = '100%';
      }
    })
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
            enabled: false
          },
          showInLegend: true,
          innerSize: '80%',
          borderWidth: 0,
          borderColor: 'black',
          slicedOffset: 20,
        }
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
            { name: 'باقي عدد المستخدمين', y: this.branchSupervisorsCount + this.agencySupervisorsCount, color: '#e0e5ef' },
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
            enabled: false
          },
          showInLegend: true,
          innerSize: '80%',
          borderWidth: 0,
          borderColor: 'black',
          slicedOffset: 20,
        }
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
            { name: 'عدد مديرين الفروع', y: this.branchSupervisorsCount, color: '#004f83' },
            { name: 'باقي عدد المستخدمين', y: this.citizensCount + this.agencySupervisorsCount, color: '#e0e5ef' },
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
            enabled: false
          },
          showInLegend: true,
          innerSize: '80%',
          borderWidth: 0,
          borderColor: 'black',
          slicedOffset: 20,
        }
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
            { name: 'عدد مديرين الجهات', y: this.agencySupervisorsCount, color: '#004f83' },
            { name: 'باقي عدد المستخدمين', y: this.citizensCount + this.branchSupervisorsCount, color: '#e0e5ef' },
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
        console.log(error), alert('invalid email or password');
      },
      () => {

      }
    );
  }

  getAllUnapprovedAgencySupervisors() {
    this._usersService.getAllUnapprovedAgencySupervisors().subscribe(
      (response: any) => {
        console.log(response);
        this.unapprovedAgencySupervisors = response
      },
      (error) => {
        console.log(error), alert('invalid email or password');
      },
      () => {

      }
    )
  }

  getAllUnapprovedBranchSupervisors() {
    this._usersService.getAllUnapprovedBranchSupervisors().subscribe(
      (response: any) => {
        console.log(response);
        this.unapprovedBranchSupervisors = response
        console.log(this.unapprovedBranchSupervisors);

      },
      (error) => {
        console.log(error), alert('invalid email or password');
      },
      () => {

      }
    )
  }

  deleteAgencySupervisorRow(supervisor: any) {
    const index = this.unapprovedAgencySupervisors.indexOf(supervisor);
    this.unapprovedAgencySupervisors.splice(index, 1);
    const userDetails = {
      govId: supervisor.govId
    }

    this._usersService.deleteAgencySupervisorFromDatabase(userDetails).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error), alert('something went wrong');
      },
      () => {

      }
    )


  }

  deleteBranchSupervisorRow(supervisor: any) {
    const index = this.unapprovedBranchSupervisors.indexOf(supervisor);
    this.unapprovedBranchSupervisors.splice(index, 1);

    const userDetails = {
      govId: supervisor.govId
    }

    this._usersService.deleteBranchSupervisorFromDatabase(userDetails).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error), alert('something went wrong');
      }
    )

  }

  approveAgencySupervisorRow(supervisor: any) {
    const index = this.unapprovedAgencySupervisors.indexOf(supervisor);
    this.unapprovedAgencySupervisors.splice(index, 1);
    const userDetails = {
      govId: supervisor.govId
    }

    this._usersService.approveAgencySupervisor(userDetails).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error), alert('something went wrong');
      },
      () => {

      }
    )


  }

  approveBranchSupervisorRow(supervisor: any) {
    const index = this.unapprovedBranchSupervisors.indexOf(supervisor);
    this.unapprovedBranchSupervisors.splice(index, 1);
    const userDetails = {
      govId: supervisor.govId
    }

    this._usersService.approveBranchSupervisor(userDetails).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error), alert('something went wrong');
      }
    )
  }

  getAgencies() {
    this._agencyService.getAgenciesForAdmin().subscribe(
      (response: any) => {
        console.log(response);
        this.allAgencies = response;
      },
      (error: any) => {
        console.log(error), alert('invalid email or password');
      },
      () => {

      }
    )
  }

  createAgency() {
    const requestBody = {
      agencyName: this.agencyForm.value.agencyName,
      branches: this.agencyForm.value.branches

    }
    this._agencyService.createAgency(requestBody).subscribe(
      (response: any) => {
        console.log(response);
        alert(response['status'])
      },
      (error: any) => {
        console.log(error), alert('invalid email or password');
      },
    );
  }

  scrollToSection(element: HTMLElement): void {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }




}




