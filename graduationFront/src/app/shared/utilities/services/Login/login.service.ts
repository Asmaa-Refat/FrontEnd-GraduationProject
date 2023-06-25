import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: boolean = false
  userType: string = ""
  userData: any = {}


  constructor(private http: HttpClient) { }

  citizenLogin(userDetails:any){
    return this.http.post('http://127.0.0.1:8000/citizenLogin/', userDetails)  
  }

  branchSuperLogin(userDetails:any){
    return this.http.post('http://127.0.0.1:8000/branchLogin/', userDetails)
  }

  agencySuperLogin(userDetails:any)
  {
    return this.http.post('http://127.0.0.1:8000/agencyLogin/', userDetails)
  }

  administratorLogin(userDetails:any)
  {
    return this.http.post('http://127.0.0.1:8000/administratorLogin/', userDetails)
  }

  updateIsLoggedIn(){
    this.isLoggedIn = true
    console.log(this.isLoggedIn);
    
  }
  updateUserType(userType: any){
    this.userType = userType
  }

  getCitizenByEmail(email:any){
    const requestBody = {
      email : email
    }
    return this.http.post('http://127.0.0.1:8000/getCitizenByEmail/', requestBody)
  }

  getBranchSupervisorById(id: any){
    const requestBody = {
      govId : id
    }
    return this.http.post('http://127.0.0.1:8000/getBranchSupervisorById/', requestBody)
  }

  getAgencySupervisorById(id: any)
  {
    const requestBody = {
      govId : id
    }
    return this.http.post('http://127.0.0.1:8000/getAgencySupervisorById/', requestBody)    
  }

  updateUserData(userData:any){
    this.userData = userData
  }

}
