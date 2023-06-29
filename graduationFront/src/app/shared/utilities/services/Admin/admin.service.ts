import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  addApp(app : any)
  {
    let apiURL = 'http://127.0.0.1:8000/addApp/';
    return this._http.post<any>(apiURL, app);
  }

  deleteApp(appName : any)
  {
    let apiURL = 'http://127.0.0.1:8000/deleteApp/';
    return this._http.post<any>(apiURL, appName);
  }

}
