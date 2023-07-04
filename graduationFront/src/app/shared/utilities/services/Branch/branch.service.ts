import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }

  updateBranchServices(requestBody:any){
    return this.http.post('http://127.0.0.1:8000/updateBranchServices/', requestBody)
  }


}
