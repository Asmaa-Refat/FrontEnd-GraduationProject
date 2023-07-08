import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailsService {

  constructor(private http: HttpClient) { }

  getAllServices(){
    return this.http.post('http://127.0.0.1:8000/getAllServices/', {});   
  }

  getAllBranchesForService(requestBody: any){
    return this.http.post('http://127.0.0.1:8000/getBranchesForService/', requestBody);   
  }
}
