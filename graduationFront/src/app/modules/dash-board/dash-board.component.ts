import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Chart } from 'angular-highcharts';
import { color } from 'highcharts';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  branchName: string = 'branch1';

  positiveListCount: number = 0;
  negativeListCount: number = 0;
  neutralListCount: number = 0;

  totalReviewsCount: number = 0;

  positiveListReviews: any[] = []
  neutralListReviews: any[] = []
  negativeListReviews: any[] = []

  positiveReviewsCountsPerMonth:any [] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  negativeReviewsCountsPerMonth:any [] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  neutralReviewsCountsPerMonth:any [] =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  reviewsYearsList = new Set<any>();

  servicesNames: any[] = []

  currentYear: any = new Date().getFullYear();
  chosenService: any = null
  isYearChanged: boolean = false
  donutChart: any
  barChart: any


  scrollToSection(element: HTMLElement): void {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  positiveAreaSplineChart:any
  negativeAreaSplineChart:any


  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit(): void {

    this.getBranchStatsAndReviews();
    this.gettingServicesNames();
  }

  gettingServicesNames(): void {
    const apiURL = 'http://127.0.0.1:8000/servicesForBranch/';

    const requestBody = {
      branchName: this.branchName,
    };

    this.http.post<any>(apiURL, requestBody).subscribe({
      next: (response) => {
        this.servicesNames = response
        return response;
      },

      error: (error) => {
        console.log('Error fetching sentiment analysis data:', error);
      },
    })

  }

  sortingReviewsPerMonth(): void {
    this.positiveReviewsCountsPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.negativeReviewsCountsPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.neutralReviewsCountsPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    this.positiveListReviews.forEach(review => {
      var reviewDate = new Date(review.date)
      this.positiveReviewsCountsPerMonth[reviewDate.getMonth()]+=1;
    });
    
    this.negativeListReviews.forEach(review => {
      var reviewDate = new Date(review.date)
      this.negativeReviewsCountsPerMonth[reviewDate.getMonth()]+=1;
    });

    this.neutralListReviews.forEach(review => {
      var reviewDate = new Date(review.date)
      this.neutralReviewsCountsPerMonth[reviewDate.getMonth()]+=1;
    });
  }

  getBranchStatsAndReviews(): void {
    const apiURL = 'http://127.0.0.1:8000/branchReviewsFilteredByYear/';

    this.currentYear = this.currentYear.toString();

    const requestBody = {
      branchName: this.branchName,
      year: this.currentYear,
    };

    this.http.post<any>(apiURL, requestBody).subscribe({
      next: (response) => {
        this.totalReviewsCount = response.positiveList.length + response.negativeList.length + response.neutralList.length

        this.positiveListCount = (response.positiveList.length / this.totalReviewsCount) * 100;
        this.negativeListCount = (response.negativeList.length / this.totalReviewsCount) * 100;
        this.neutralListCount = (response.neutralList.length / this.totalReviewsCount) * 100;

        this.positiveListReviews = response.positiveList
        this.negativeListReviews = response.negativeList
        this.neutralListReviews = response.neutralList

        this.sortingReviewsPerMonth()
        this.generatingDonutChart()
        this.generatingBarChart()
        this.generatingPositveAreaSplineChart()
        this.generatingNegativeAreaSplineChart()
        this.getReviewsYears()

      }
    })
  }

  generatingDonutChart(): void {
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
          events: {
            click: (event: any) => {
              const point = event.point;
              if (point.name === 'ايجابي') {
                const positiveReviewsSection =
                  document.getElementById('positive');
                if (positiveReviewsSection) {
                  this.scrollToSection(positiveReviewsSection);
                }
              }
              if (point.name === 'سلبي') {
                const negativeReviewsSection =
                  document.getElementById('negative');
                if (negativeReviewsSection) {
                  this.scrollToSection(negativeReviewsSection);
                }
              }
              if (point.name === 'محايد') {
                const neutralReviewsSection = document.getElementById('neutral');
                if (neutralReviewsSection) {
                  this.scrollToSection(neutralReviewsSection);
                }
              }
            },
          },
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
            { name: 'ايجابي', y: this.positiveListCount, color: '#82c65a' },
            { name: 'سلبي', y: this.negativeListCount, color: '#f26925' },
            { name: 'محايد', y: this.neutralListCount, color: '#edcd33' },
          ],
        },
      ],
    });
  }

  generatingBarChart():void{
    this.barChart = new Chart({
      chart: {
        type: 'bar',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: 'احصائيات السنه',
      },
      yAxis: {
        visible: false,
        gridLineColor: '#fff',
      },
      legend: {
        enabled: true,
      },
      xAxis: {
        lineColor: '#fff',
        categories: [
          'يناير',
          'فبراير',
          'مارس',
          'ابريل',
          'مايو',
          'يونيو',
          'يوليو',
          'اغسطس',
          'سبتمبر',
          'اكتوبر',
          'نوفمبر',
          'ديسمبر',
        ],
      },
      plotOptions: {
        series: {
          borderRadius: 20,
        } as any,
      },
      series: [{
        type: 'bar',
        name: 'ايجابي',
        data: this.positiveReviewsCountsPerMonth,
        color: '#82c65a'
      }, {
        type: 'bar',
        name: 'سلبي',
        data: this.negativeReviewsCountsPerMonth,
        color: '#f26925'
      }, {
        type: 'bar',
        name: 'محايد',
        data: this.neutralReviewsCountsPerMonth,
        color: '#edcd33'
      }]
    });
  }

  generatingPositveAreaSplineChart():void{
    this.positiveAreaSplineChart = new Chart({
      chart: {
        styledMode: true,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      title: {
        text: 'مؤشر التعليقات الايجابية',
      },
      yAxis: {
        visible: true,
        title: {
          text: 'عدد التعليقات',
        },
      },
  
      xAxis: {
        visible: true,
  
        categories: [
          'يناير',
          'فبراير',
          'مارس',
          'ابريل',
          'مايو',
          'يونيو',
          'يوليو',
          'اغسطس',
          'سبتمبر',
          'اكتوبر',
          'نوفمبر',
          'ديسمبر',
        ],
      },
  
      defs: {
        gradient0: {
          tagName: 'linearGradient',
          id: 'gradient-0',
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
          children: [
            {
              tagName: 'stop',
              offset: 0,
            },
            {
              tagName: 'stop',
              offset: 1,
            },
          ],
        },
      } as any,
  
      series: [
        {
          type: 'areaspline',
          keys: ['y', 'selected'],
          data: this.positiveReviewsCountsPerMonth,
        },
      ],
    });
    
  }

  generatingNegativeAreaSplineChart():void{  

   this.negativeAreaSplineChart = new Chart({
    chart: {
      styledMode: true,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'مؤشر التعليقات السلبيه',
    },
    yAxis: {
      visible: true,
      title: {
        text: 'عدد التعليقات',
      },
    },
    xAxis: {
      visible: true,
      categories: [
        'يناير',
        'فبراير',
        'مارس',
        'ابريل',
        'مايو',
        'يونيو',
        'يوليو',
        'اغسطس',
        'سبتمبر',
        'اكتوبر',
        'نوفمبر',
        'ديسمبر',
      ],
    },
    defs: {
      gradient0: {
        tagName: 'linearGradient',
        id: 'gradient-0',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: 'stop',
            offset: 0,
          },
          {
            tagName: 'stop',
            offset: 1,
          },
        ],
      },
    } as any,
    series: [
      {
        color: 'red',
        type: 'areaspline',
        keys: ['y', 'selected'],
        data: this.negativeReviewsCountsPerMonth
      },
    ],
  });
  }

  choosingService(name: any): void {
    this.chosenService = name
  }

  choosingYear(year: any): void {
    this.currentYear = year
    this.isYearChanged = true
  }

  getSerivceStatsAndReviews(): void {

    this.currentYear = this.currentYear.toString();

    let apiURL = 'http://127.0.0.1:8000/serviceReviewsFilteredByYear/';
    if (this.isYearChanged == true && (this.chosenService == null || this.chosenService == 'كل الخدمات')) {
      apiURL = 'http://127.0.0.1:8000/branchReviewsFilteredByYear/';
    }

    const requestBody = {
      serviceName: this.chosenService,
      branchName: this.branchName,
      year: this.currentYear,
    };

    this.http.post<any>(apiURL, requestBody).subscribe({
      next: (response) => {

        this.totalReviewsCount = response.positiveList.length + response.negativeList.length + response.neutralList.length

        this.positiveListCount = (response.positiveList.length / this.totalReviewsCount) * 100;
        this.negativeListCount = (response.negativeList.length / this.totalReviewsCount) * 100;
        this.neutralListCount = (response.neutralList.length / this.totalReviewsCount) * 100;

        this.positiveListReviews = response.positiveList
        this.negativeListReviews = response.negativeList
        this.neutralListReviews = response.neutralList

        this.sortingReviewsPerMonth()
        this.generatingDonutChart()
        this.generatingBarChart()
        this.generatingPositveAreaSplineChart()
        this.negativeAreaSplineChart()
      },
      error: (error) => {
        console.log('Error fetching sentiment analysis data:', error);
      },
    });
  }

  getReviewsYears(): void {
    let apiURL = 'http://127.0.0.1:8000/reviewsYearsFilteredByBranch/';

    const requestBody = {
      branchName: this.branchName,
    };

    this.http.post<any>(apiURL, requestBody).subscribe({
      next: (response) => {
        this.reviewsYearsList = response

      }
    })
  }

  clickingServiceDropdown(): void {
    let x = document.getElementById("myServiceDropdown");
    if (x != null) {
      x.classList.toggle("show");
    }
  }

  clickingYearDropdown(): void {
    let x = document.getElementById("myYearDropdown");
    if (x != null) {
      x.classList.toggle("show");
    }
  }

  closeDropdownOnClickOutside(): void {
    window.addEventListener('click', (event: any) => {
      const target = event.target as HTMLElement;
      const isDropBtn = target.matches('.dropbtn');
      const dropdowns = document.getElementsByClassName('dropdown-content');

      if (!isDropBtn) {
        for (let i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    });
  }

}
