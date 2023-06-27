import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }
  getHistory(request: any) 
  {
    const apiURL = 'http://127.0.0.1:8000/citizenReviewsHistory/';

    return this.http.post<any>(apiURL, request);
  }
}
