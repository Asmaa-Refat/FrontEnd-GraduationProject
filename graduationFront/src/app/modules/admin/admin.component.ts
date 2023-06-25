import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  donutChart: any

  constructor() { }

  ngOnInit(): void {
    this.generateDonutChart();
  }

  generateDonutChart(): void {
    this.donutChart = new Chart({
      chart: {
        type: 'pie',

        plotShadow: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true,
          innerSize: '80%',
          borderWidth: 0,
          borderColor: 'black',
          slicedOffset: 20,
        },
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'احصائيات',
      },
      legend: {
        enabled: true,
      },
      series: [
        {
          type: 'pie',
          data: [
            { name: 'اجمالي عدد المواطنين', y:55, color: '#82c65a' },
          ],
        },
      ],
    });
  }

}
