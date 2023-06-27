import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}
  addReview(request: any) {
    const apiURL = 'http://127.0.0.1:8000/addreview/';

    return this.http.post<any>(apiURL, request);
  }
}
