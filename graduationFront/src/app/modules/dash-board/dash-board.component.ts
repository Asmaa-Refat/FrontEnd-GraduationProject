import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  serviceName: string = "استخراج بطاقه";
  branchName: string = "branch1";
  result: any;

  constructor(private http: HttpClient) { }

  

  analyzeSentiment(): void {
    const apiURL = 'http://127.0.0.1:8000/serviceReviews/';
    let encodedText = encodeURIComponent(this.serviceName);
    const requestBody = {
      serviceName: this.serviceName,
      branchName: this.branchName
    };
    
    this.http.get(apiURL, {params:requestBody}).subscribe({
      next: (response) => {
        console.log(response);
        this.result = response;
      },
    });
  }

  ngOnInit(): void {
    this.analyzeSentiment()
  }
}
