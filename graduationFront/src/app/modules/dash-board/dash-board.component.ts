import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Chart } from 'angular-highcharts';
import { FacilityService } from 'src/app/shared/utilities/services/Facility/facility.service';
import { SideBarToogleService } from 'src/app/shared/utilities/services/SideBarToggle/side-bar-toogle.service';
import { ReviewService } from 'src/app/shared/utilities/services/Review/review.service';
import { error } from 'jquery';
import { BranchService } from 'src/app/shared/utilities/services/Branch/branch.service';
import { UsersService } from 'src/app/shared/utilities/services/Users/users.service';
import { AgencyService } from 'src/app/shared/utilities/services/Agency/agency.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  branchName: any = localStorage.getItem('branchName');
  agencyName: any = localStorage.getItem('agencyName');

  userType: any;

  positiveListCount: number = 0;
  negativeListCount: number = 0;
  neutralListCount: number = 0;

  totalReviewsCount: number = 0;

  positiveListReviews: any[] = [];
  neutralListReviews: any[] = [];
  negativeListReviews: any[] = [];

  positiveReviewsCountsPerMonth: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  negativeReviewsCountsPerMonth: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  neutralReviewsCountsPerMonth: any[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  reviewsYearsList = new Set<any>();

  servicesNames: any = [];
  branchesNames: any = [];

  currentYear: any = new Date().getFullYear();

  chosenService: string = 'كل الخدمات';
  chosenBranch: string = 'كل الفروع'

  isYearChanged: boolean = false;
  donutChart: any;
  barChart: any;
  positiveAreaSplineChart: any;
  negativeAreaSplineChart: any;

  isOpen$ = this._sideBarToggleService.isOpen$;

  constructor(
    private http: HttpClient,
    private _reviewService: ReviewService,
    public _facilityService: FacilityService,
    private _sideBarToggleService: SideBarToogleService,
    private _branchService: BranchService,
    private _usersService: UsersService,
    private _agencyService: AgencyService
  ) {}

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType');

    this.isOpen$.subscribe((isOpen: any) => {
      const dropdowns = document.getElementById('dropdowns') as HTMLElement;
      const charts = document.getElementById('charts') as HTMLElement;
      const reviewsTable = document.getElementById(
        'reviewsTable'
      ) as HTMLElement;
      if (isOpen) {
        dropdowns.style.transform = 'translateX(-175px)';
        charts.style.transform = 'translateX(-125px)';
        reviewsTable.style.transform = 'translateX(-120px)';
      } else {
        dropdowns.style.transform = 'none';
        charts.style.transform = 'none';
        reviewsTable.style.transform = 'none';
      }
    });

    if (this.userType == 'agencySupervisor') {
      this.getBranchesNames();
    }

    this.getStatsAndReviews();
    this.getServicesNames();
    this.getReviewsYears();
  }

  /** dropdowns section */
  onServicesOptionChange(event: any) {
    this.chosenService = event.target.value;
    this.getStatsAndReviews();
  }

  onBranchOptionChange(event: any) {
    this.chosenBranch = event.target.value;
    this.getStatsAndReviews();
  }

  onYearOptionChange(event: any) {
    if (event.target.value == 'العام الحالى') {
      this.currentYear = new Date().getFullYear();
    } else {
      this.currentYear = event.target.value;
      this.isYearChanged = true;
    }
    this.getStatsAndReviews();
  }
  /** end of dropdowns section */

  /**API's section */

  getReviewsYears(): void {
    let apiURL = '';
    let requestBody = {};
    if (this.userType == 'branchSupervisor') {
      apiURL = 'http://127.0.0.1:8000/reviewsYearsFilteredByBranch/';
      requestBody = {
        branchName: this.branchName,
      };
    } else if (this.userType == 'agencySupervisor') {
      apiURL = 'http://127.0.0.1:8000/reviewsYearsFilteredByAgency/';
      requestBody = {
        agencyName: this.agencyName,
      };
    }

    this.http.post<any>(apiURL, requestBody).subscribe({
      next: (response) => {
        let currentYearAsNumber = parseInt(this.currentYear, 10);

        if (response.includes(currentYearAsNumber)) {
          const index = response.indexOf(currentYearAsNumber);
          response.splice(index, 1);
        }

        this.reviewsYearsList = response;
      },
    });
  }

  getServicesNames(): void {
    console.log(this._facilityService.servicesNames);
    let requestBody = {};
    if (this.userType == 'agencySupervisor') {
      requestBody = {
        agencyName: this.agencyName,
      };

      this._usersService
        .getAllAgencyServicesForAgencySupervisor(requestBody)
        .subscribe(
          (response: any) => {
            this.servicesNames = response;
          },
          (error) => {
            console.log(error), alert('something went wrong');
          }
        );
    } else if (this.userType == 'branchSupervisor') {
      console.log('in branch');
      requestBody = {
        branchName: this.branchName,
      };

      this._facilityService.getServicesNames(requestBody).subscribe(
        (response: any) => {
          console.log('in branch');

          console.log(response);
          this.servicesNames = response;
        },
        (error) => {
          console.log(error), alert('something went wrong');
        }
      );
    }
  }

  getBranchesNames(): void {
    let requestBody = {
      agencyName: this.agencyName,
    };
    this._agencyService.getBranchesForAgency(requestBody).subscribe(
      (response) => {
        console.log(response);

        this.branchesNames = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /**end of API's section */

  /** charts section */
  scrollToSection(element: HTMLElement): void {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  sortReviewsPerMonth(): void {
    this.positiveReviewsCountsPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.negativeReviewsCountsPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.neutralReviewsCountsPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.positiveListReviews.forEach((review) => {
      var reviewDate = new Date(review.date);
      this.positiveReviewsCountsPerMonth[reviewDate.getMonth()] += 1;
    });

    this.negativeListReviews.forEach((review) => {
      var reviewDate = new Date(review.date);
      this.negativeReviewsCountsPerMonth[reviewDate.getMonth()] += 1;
    });

    this.neutralListReviews.forEach((review) => {
      var reviewDate = new Date(review.date);
      this.neutralReviewsCountsPerMonth[reviewDate.getMonth()] += 1;
    });
  }

  getStatsAndReviews(): void {
    let apiURL = '';
    let choice : any;

    if (this.userType == 'branchSupervisor') {
      apiURL = 'http://127.0.0.1:8000/branchReviewsFilteredByYear/';
      choice = this.branchName;
    }
    else if (this.userType == 'agencySupervisor') {
      apiURL = 'http://127.0.0.1:8000/agencyReviewsFilteredByYear/';
      choice = this.chosenBranch;
    }

    const requestBody = {
      serviceName: this.chosenService,
      branchName: choice,
      agencyName: this.agencyName,
      year: this.currentYear,
    };

    console.log('body  ', requestBody);
    

    this.currentYear = this.currentYear.toString();
    if (this.userType == 'branchSupervisor' && this.chosenService != 'كل الخدمات')
        apiURL = 'http://127.0.0.1:8000/serviceReviewsFilteredByYear/';
        
    else  if (this.userType == 'agencySupervisor' &&this.chosenService == 'كل الخدمات' && this.chosenBranch != 'كل الفروع') {
        apiURL = 'http://127.0.0.1:8000/branchReviewsFilteredByYear/';
      }
    else  if (this.userType == 'agencySupervisor' && this.chosenService != 'كل الخدمات' && this.chosenBranch == 'كل الفروع') {
      apiURL = 'http://127.0.0.1:8000/serviceReviewsFilteredByYear/';
    } 
    else if (this.userType == 'agencySupervisor' && this.chosenService != 'كل الخدمات' && this.chosenBranch != 'كل الفروع') {
      apiURL = 'http://127.0.0.1:8000/serviceReviewsFilteredByYear/';
        
    }
      console.log(apiURL);
      
    this._facilityService
      .getStatsAndReviews(apiURL, requestBody)
      .subscribe((response: any) => {
        console.log(response);

        this.totalReviewsCount =
          response.positiveList.length +
          response.negativeList.length +
          response.neutralList.length;

        this.positiveListCount =
          (response.positiveList.length / this.totalReviewsCount) * 100;
        this.negativeListCount =
          (response.negativeList.length / this.totalReviewsCount) * 100;
        this.neutralListCount =
          (response.neutralList.length / this.totalReviewsCount) * 100;

        this.positiveListReviews = response.positiveList;
        this.negativeListReviews = response.negativeList;
        this.neutralListReviews = response.neutralList;

        this.sortReviewsPerMonth();
        this.generateDonutChart();
        this.generateBarChart();
        this.generatePositveAreaSplineChart();
        this.generateNegativeAreaSplineChart();
      });
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
            enabled: false,
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
                const neutralReviewsSection =
                  document.getElementById('neutral');
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

  generateBarChart(): void {
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
      series: [
        {
          type: 'bar',
          name: 'ايجابي',
          data: this.positiveReviewsCountsPerMonth,
          color: '#82c65a',
        },
        {
          type: 'bar',
          name: 'سلبي',
          data: this.negativeReviewsCountsPerMonth,
          color: '#f26925',
        },
        {
          type: 'bar',
          name: 'محايد',
          data: this.neutralReviewsCountsPerMonth,
          color: '#edcd33',
        },
      ],
    });
  }

  generatePositveAreaSplineChart(): void {
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

  generateNegativeAreaSplineChart(): void {
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
          data: this.negativeReviewsCountsPerMonth,
        },
      ],
    });
  }
  /** end of charts section */

  /** updating reviews state section */
  onPositiveListOptionChange(event: any, index: any) {
    console.log(event);

    let reviewNewState = event.target.value;
    if (reviewNewState == 'تم الحل') event.target.style.color = 'green';
    else if (reviewNewState == 'قيد التنفيذ')
      event.target.style.color = 'orange';
    else if (reviewNewState == 'قيد الانتظار') event.target.style.color = 'red';

    let id = this.positiveListReviews[index]['reviewId'];

    const requestBody = {
      state: reviewNewState,
      reviewId: id,
    };

    this.updateReviewState(requestBody);
  }
  onNegativeListOptionChange(event: any, index: any) {
    let reviewNewState = event.target.value;
    let id = this.negativeListReviews[index]['reviewId'];

    if (reviewNewState == 'تم الحل') event.target.style.color = 'green';
    else if (reviewNewState == 'قيد التنفيذ')
      event.target.style.color = 'orange';
    else if (reviewNewState == 'قيد الانتظار') event.target.style.color = 'red';

    const requestBody = {
      state: reviewNewState,
      reviewId: id,
    };

    this.updateReviewState(requestBody);
  }
  onNeutralListOptionChange(event: any, index: any) {
    let reviewNewState = event.target.value;
    let id = this.neutralListReviews[index]['reviewId'];

    if (reviewNewState == 'تم الحل') event.target.style.color = 'green';
    else if (reviewNewState == 'قيد التنفيذ')
      event.target.style.color = 'orange';
    else if (reviewNewState == 'قيد الانتظار') event.target.style.color = 'red';

    const requestBody = {
      state: reviewNewState,
      reviewId: id,
    };

    this.updateReviewState(requestBody);
  }

  updateReviewState(requestBody: any) {
    this._reviewService.updateReviewState(requestBody).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error), alert('something went wrong');
      }
    );
  }

  /**end of updating reviews section */

  clickServiceDropdown(): void {
    let x = document.getElementById('myServiceDropdown');
    if (x != null) {
      x.classList.toggle('show');
    }
  }

  clickYearDropdown(): void {
    let x = document.getElementById('myYearDropdown');
    if (x != null) {
      x.classList.toggle('show');
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

  chooseService(name: any): void {
    this.chosenService = name;
  }

  chooseYear(year: any): void {
    this.currentYear = year;
    this.isYearChanged = true;
  }
}
