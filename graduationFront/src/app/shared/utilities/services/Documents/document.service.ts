import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  constructor(private http : HttpClient) { }

  getDocumentsForService(serviceName: any){
    const requestBody = {
        serviceName : serviceName
    }
    return this.http.post('http://127.0.0.1:8000/documentsForService/', requestBody);   
  }

 
}
