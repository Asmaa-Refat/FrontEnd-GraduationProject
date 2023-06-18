import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  Chart  from 'chart.js/auto';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  serviceName: string = "استخراج بطاقه";
  branchName: string = "branch1";
  positiveListCount: number = 0;
  negativeListCount: number = 0;
  neutralListCount: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.analyzeSentiment();
  }

  analyzeSentiment(): void {
    const apiURL = 'http://127.0.0.1:8000/serviceReviews/';

    const requestBody = {
      serviceName: this.serviceName,
      branchName: this.branchName
    };

    this.http.post<any>(apiURL, requestBody).subscribe({
      next: (response) => {
        this.positiveListCount = response.positiveList.length;
        this.negativeListCount = response.negativeList.length;
        this.neutralListCount = response.neutralList.length;
        this.updateChart();
      },
      error: (error) => {
        console.log('Error fetching sentiment analysis data:', error);
      }
    });
  }

  updateChart(): void {
    const chartData = {
      labels: ['Positive', 'Negative', 'Neutral'],
      datasets: [{
        label: 'Sentiment Analysis',
        data: [this.positiveListCount, this.negativeListCount, this.neutralListCount],
        backgroundColor: ['#00cc99', '#ff6666', '#cccccc']
      }]
    };

    const chartOptions = {
      responsive: true,
      cutoutPercentage: 80,
      legend: {
        display: false
      }
    };

    const chart = new Chart('sentimentChart', {
      type: 'doughnut',
      data: chartData,
      options: chartOptions
    });
  }

}