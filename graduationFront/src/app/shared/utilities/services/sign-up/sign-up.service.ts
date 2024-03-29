import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  isSignup: string = ""
  
  branchSupData: any
  agencySupData: any
  constructor(private http: HttpClient) { }
  
  citizenSignup(userDetails:any) {
    return this.http.post('http://127.0.0.1:8000/citizenSignup/', userDetails)      
  }

  branchSignup(userDetails:any) {
  
    return this.http.post('http://127.0.0.1:8000/branchSignup/', userDetails)
      
  }

  agencySignup(userDetails:any) {
   return this.http.post('http://127.0.0.1:8000/agencySignup/', userDetails);
      
  }

}
