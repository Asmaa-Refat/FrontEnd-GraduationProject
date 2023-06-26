import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'angular-highcharts';
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

  agencyForm: any;

  constructor(private fb: FormBuilder, private _usersService : UsersService) {
    this.agencyForm = this.fb.group({
      agencyName: ['', Validators.required],
      branches: this.fb.array([this.createBranch()])
    });
  }

  createBranch(): FormGroup {
    return this.fb.group({
      branchName: ['', Validators.required],
      services: this.fb.array([this.createService()])
    });
  }

  createService(): FormGroup {
    return this.fb.group({
      serviceName: ['', Validators.required],
      type: ['', Validators.required],
      documents: this.fb.array([this.createDocument()])
    });
  }

  createDocument(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  get branches(): FormArray {
    return this.agencyForm.get('branches') as FormArray;
  }

  addBranch() {
    this.branches.push(this.createBranch());
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
      govId : supervisor.govId
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
      govId : supervisor.govId
    }
    
    this._usersService.deleteBranchSupervisorFromDatabase(userDetails).subscribe(
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

  approveAgencySupervisorRow(supervisor: any) {
    const index = this.unapprovedAgencySupervisors.indexOf(supervisor);
    this.unapprovedAgencySupervisors.splice(index, 1);
    const userDetails = {
      govId : supervisor.govId
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
      govId : supervisor.govId
    }

    this._usersService.approveBranchSupervisor(userDetails).subscribe(
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

  generateBranchDetails(){
    let html = ''

  }
  generateServiceDetails(){

  }
}




