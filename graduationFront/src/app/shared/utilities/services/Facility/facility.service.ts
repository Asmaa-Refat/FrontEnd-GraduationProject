import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  public servicesNames: any[] = [];
  constructor(private http: HttpClient) {}

  getServicesNames(requestBody: any){
    const apiURL = 'http://127.0.0.1:8000/servicesForBranch/';
    return this.http.post(apiURL, requestBody);
  }

  getStatsAndReviews(url:any,requestBody:any){
    return this.http.post(url, requestBody)

  }
}
