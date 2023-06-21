import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  servicesNames: any[] = [];
  constructor(private http: HttpClient) {}

  getServicesNames(branchName: any): void {
    const apiURL = 'http://127.0.0.1:8000/servicesForBranch/';

    const requestBody = {
      branchName: branchName,
    };

    this.http.post<any>(apiURL, requestBody).subscribe({
      next: (response) => {
        this.servicesNames = response;
      },

      error: (error) => {
        console.log('Error fetching sentiment analysis data:', error);
      },
    });   
  }
}
