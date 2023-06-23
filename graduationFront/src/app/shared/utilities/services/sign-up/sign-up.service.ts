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
  
    this.http
      .post('http://127.0.0.1:8000/branchSignup/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
          if(this.isSignup == "Added Successfully!!"){
            this.branchSupData = userDetails

          }
        },
      });
  }

  agencySignup(userDetails:any) {
    this.http
      .post('http://127.0.0.1:8000/agencySignup/', userDetails)
      .subscribe({
        next: (response) => {
          console.log(response);
          if(this.isSignup == "Added Successfully!!"){
            this.agencySupData = userDetails

          }
        },
      });
  }

}
