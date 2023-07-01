import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/shared/utilities/services/Branch/branch.service';
import { SideBarToogleService } from 'src/app/shared/utilities/services/SideBarToggle/side-bar-toogle.service';
import { UsersService } from 'src/app/shared/utilities/services/Users/users.service';

@Component({
  selector: 'app-branch-services',
  templateUrl: './branch-services.component.html',
  styleUrls: ['./branch-services.component.scss']
})
export class BranchServicesComponent implements OnInit {

  agencyServices:any = []
  branchServices:any = []

  isOpen$ = this._sideBarToggleService.isOpen$;

  constructor(private _usersService: UsersService, private _branchService: BranchService, private _sideBarToggleService: SideBarToogleService) { }

  ngOnInit(): void {
    this.getAllAgencyServicesForBranchSupervisor();
    this.isOpen$.subscribe((isOpen: any) => {
      
    const content = document.getElementById('main-content') as HTMLElement;
      if (isOpen) {
        content.style.transform = 'translateX(-120px)'
      } else {
        content.style.transform = 'none'
      }
      
    });
  }

  getAllAgencyServicesForBranchSupervisor(){
    const requestBody = {
      "govId": localStorage.getItem('govId')
    }
    
    this._usersService.getAllAgencyServicesForBranchSupervisor(requestBody).subscribe(
      (response: any) => {
        this.agencyServices = response['agencyServices']
        this.branchServices = response['branchServices']
      },
      (error) => {
        console.log(error), alert('something went wrong');
      }
    );


  }

  serviceChosenToAdd(service : any){
    const index = this.agencyServices.indexOf(service);
    this.agencyServices.splice(index, 1);

    this.branchServices.push(service)

    const requestBody = {
      "govId": localStorage.getItem('govId'),
      "services": this.branchServices
  
    }

    this._branchService.updateBranchServices(requestBody).subscribe(
      (response: any) => {
        console.log(response)
      },
      (error:any) => {
        console.log(error), alert('something went wrong');
      }
    );



  }

  serviceChosenToRemove(service :any){
    const index = this.branchServices.indexOf(service);
    this.branchServices.splice(index, 1);

    this.agencyServices.push(service)

    const requestBody = {
      "govId": localStorage.getItem('govId'),
      "services": this.branchServices
  
    }
    
    this._branchService.updateBranchServices(requestBody).subscribe(
      (response: any) => {
        console.log(response)
      },
      (error:any) => {
        console.log(error), alert('something went wrong');
      }
    );

  }


}
