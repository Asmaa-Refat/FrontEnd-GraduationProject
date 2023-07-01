import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }
  getTotalNumberOfEachUser(){
    return this.http.post('http://127.0.0.1:8000/getTotalNumberOfEachUser/', {})      
  }

  getAllUnapprovedAgencySupervisors(){
    return this.http.post('http://127.0.0.1:8000/getAllUnapprovedAgencySupervisors/',{})
  }
  getAllUnapprovedBranchSupervisors(){
    return this.http.post('http://127.0.0.1:8000/getAllUnapprovedBranchSupervisors/',{})
  }

  deleteAgencySupervisorFromDatabase(userDetails:any){
    return this.http.post('http://127.0.0.1:8000/deleteAgencySupervisorFromDatabase/',userDetails)
  }

  deleteBranchSupervisorFromDatabase(userDetails:any){
    return this.http.post('http://127.0.0.1:8000/deleteBranchSupervisorFromDatabase/',userDetails)
  }

  approveAgencySupervisor(userDetails:any){
    return this.http.post('http://127.0.0.1:8000/approveAgencySupervisor/',userDetails)
  }

  approveBranchSupervisor(userDetails:any){
    return this.http.post('http://127.0.0.1:8000/approveBranchSupervisor/',userDetails)
  }

  getAllAgencyServicesForBranchSupervisor(requestBody:any){
    return this.http.post('http://127.0.0.1:8000/getAllAgencyServicesForBranchSupervisor/', requestBody)
  }

  getAllAgencyServicesForAgencySupervisor(requestBody:any){
    return this.http.post('http://127.0.0.1:8000/getAllAgencyServicesForAgencySupervisor/', requestBody)
  }

}
