import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false
  userType: string = ""
  citizenEmail :any
  userData: any = {}


  constructor(private http: HttpClient) { }

  citizenLogin(userDetails:any){
    return this.http.post('http://127.0.0.1:8000/citizenLogin/', userDetails)  
  }

  branchLogin(userDetails:any){
    return this.http.post('http://127.0.0.1:8000/branchLogin/', userDetails)
  }

  

  updateIsLoggedIn(){
    this.isLoggedIn = true
  }
  updateUserType(userType: any){
    this.userType = userType
  }

  getCitizenByEmail(email:any){
    this.citizenEmail = email
    const requestBody = {
      email : email
    }
    return this.http.post('http://127.0.0.1:8000/getCitizenByEmail/', requestBody)
  }

  getBranchSupervisiorById(id: any){
    
  }

  updateuserData(userData:any){
    this.userData = userData
  }

}
