import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(private http: HttpClient) {}
  branches: any;
  agencies: any;

  getAgencyBranches(requestBody: any): any {
    let apiURL = 'http://127.0.0.1:8000/getBranchesForAgency/';

   
    return this.http.post<any>(apiURL, requestBody)
    /*.subscribe({
      next: (response) => {
        this.branches = response;
      },
      error: (error) => {
        console.log('Error fetching sentiment analysis data:', error);
      },
    });*/
  }

  getAgencies(): any {
    return this.http.get('http://127.0.0.1:8000/getAgencies/');

    
  }

  createAgency(requestBody:any):any{
    return this.http.post('http://127.0.0.1:8000/createAgency/',requestBody)
  }

  getAgenciesForAdmin():any{
    return this.http.post('http://127.0.0.1:8000/getAgenciesForAdmin/',{})
  }

  addServiceForAgency(requestBody:any){
    return this.http.post('http://127.0.0.1:8000/addServiceForAgency/', requestBody)
  }
  updateService(requestBody:any){
    return this.http.post('http://127.0.0.1:8000/updateService/', requestBody)
  }
  getReviewsYearsFilteredByAgency(requestBody:any){
    return this.http.post('http://127.0.0.1:8000/reviewsYearsFilteredByAgency/', requestBody)
  }

  getBranchesForAgency(requestBody:any){
    return this.http.post('http://127.0.0.1:8000/getBranchesForAgency/', requestBody)
  }
}
