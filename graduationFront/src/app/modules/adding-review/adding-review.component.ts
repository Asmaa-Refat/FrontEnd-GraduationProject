import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/shared/utilities/services/Facility/facility.service';
import { AgencyService } from 'src/app/shared/utilities/services/Agency/agency.service';
import { ReviewService } from 'src/app/shared/utilities/services/Review/review.service';

@Component({
  selector: 'app-adding-review',
  templateUrl: './adding-review.component.html',
  styleUrls: ['./adding-review.component.scss'],
})
export class AddingReviewComponent implements OnInit {
  branches: any;
  agencies: any;
  services: any;
  chosenAgency: any;
  chosenBranch: any;
  chosenService: any;

  fillGapsAlert: any

  showAlert: any = -1;

  constructor(
    private _agencyService: AgencyService,
    private _facilityService: FacilityService,
    public _reviewService: ReviewService
  ) { }
  ngOnInit(): void {
    this.generateAgencies()
  }


  generateAgencies() {
    //this.agencies = this._agencyService.agencies;

    this._agencyService.getAgencies().subscribe(
      (response:any)=>{
        console.log(response);
        this.agencies = response
        

      },
      (error:any)=>{
        console.log(error);
        

      }
    );
  }

  onSelectAgency(target: any) {
    this.chosenAgency = target.value;
    this.generateBranches()
    console.log(this.chosenAgency);
  }

  onSelectBranch(target: any) {
    this.chosenBranch = target.value;
    this.generateServices()
    console.log(this.chosenBranch);
  }
  

  generateBranches() {
    //this.branches = this._agencyService.branches;
    const requestBody = {
      agencyName: this.chosenAgency,
    };

    this._agencyService.getAgencyBranches(requestBody).subscribe(
      (response:any)=>{
        this.branches = response
      },
      (error:any)=>{
        console.log(error);
        
      }
    );
    
  }

  generateServices() {
    let requestBody = {
      branchName:this.chosenBranch
    }
    this._facilityService.getServicesNames(requestBody).subscribe(
      (response:any)=>{
        console.log(response);
        
        this.services = response;
      },
      (error:any)=>{
        console.log(error);
        
      }
    );
  }


  onSelectService(event: any) {
    this.chosenService = event.target.value;
    //console.log(event);
    //console.log("this.chosenService.name");
    
    console.log(this.chosenService);
  }

  addReview() {
    const description = document.getElementById(
      'exampleFormControlTextarea1'
    ) as HTMLTextAreaElement;
    console.log('this is email', localStorage.getItem('email'));



    const request = {
      email: localStorage.getItem('email'),
      destination: this.chosenService,
      relatedBranch: this.chosenBranch,
      description: description.value,
      state: 'قيد الانتظار',
    };
    console.log(this.chosenService);
    

    if (!request.destination || !request.relatedBranch || !request.description) {
      this.fillGapsAlert = 1;
      setTimeout(() => {
        this.fillGapsAlert = 0;
      }, 2000);

    }
    else {

      this._reviewService.addReview(request).subscribe(
        (response) => {
          console.log(response);
          if (response == 'Added Successfully!!') {

            this.showAlert = 1;
            
            setTimeout(() => {
              this.showAlert = 0;
            }, 2000);

          }
        },
        (error) => {
          console.log('Error fetching sentiment analysis data:', error);
        }
      );
    }
  }
}
