import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  editProfile(userUpdatedData:any){
    return this.http.post('http://127.0.0.1:8000/editProfile/', userUpdatedData)  
  }
}
