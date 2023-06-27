import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(private http: HttpClient) {}
  branches: any;
  agencies: any;

  getAgencyBranches(agencyName: string): any {
    let apiURL = 'http://127.0.0.1:8000/getBranchesForAgency/';

    const requestBody = {
      agencyName: agencyName,
    };

    this.http.post<any>(apiURL, requestBody).subscribe({
      next: (response) => {
        this.branches = response;
      },
      error: (error) => {
        console.log('Error fetching sentiment analysis data:', error);
      },
    });
  }

  getAgencies(): any {
    let apiURL = 'http://127.0.0.1:8000/getAgencies/';

    this.http.get<any>(apiURL).subscribe({
      next: (response) => {
        this.agencies = response;
      },
      error: (error) => {
        console.log('Error fetching sentiment analysis data:', error);
      },
    });
  }
  createAgency(requestBody:any):any{
    return this.http.post('http://127.0.0.1:8000/createAgency/',requestBody)
  }
  getAgenciesForAdmin():any{
    return this.http.post('http://127.0.0.1:8000/getAgenciesForAdmin/',{})
  }
}
