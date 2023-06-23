import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/shared/utilities/services/Facility/facility.service';
import { AgencyService } from 'src/app/shared/utilities/services/Agency/agency.service';
import { ReviewService } from 'src/app/shared/utilities/services/Review/review.service';

@Component({
  selector: 'app-adding-review',
  templateUrl: './adding-review.component.html',
  styleUrls: ['./adding-review.component.scss']
})
export class AddingReviewComponent implements OnInit {
  branches : any
  agencies : any
  services : any
  chosenAgency : any
  chosenBranch : any
  chosenService : any

  constructor(private _agencyService : AgencyService,  private _facilityService : FacilityService, private _reviewService: ReviewService) { }
  ngOnInit(): void {
    this._agencyService.getAgencies()
  }

  generateAgencies()
  {
    this.agencies = this._agencyService.agencies    
  }

  onSelectAgency(target: any)
  {    
    this.chosenAgency = target.value
    this._agencyService.getAgencyBranches(this.chosenAgency)
    console.log(this.chosenAgency);
  }

  onSelectBranch(target: any)
  {
    this.chosenBranch = target.value
    this._facilityService.getServicesNames(this.chosenBranch)
    console.log(this.chosenBranch);
  }

  generateBranches()
  {
    this.branches = this._agencyService.branches  
  }

  generateServices()
  {
    this.services = this._facilityService.servicesNames 
  }

  onSelectService(target: any)
  {
    this.chosenService = target.value
    console.log(this.chosenService);
  }

  addReview()
  {
    const description  = document.getElementById('exampleFormControlTextarea1') as HTMLTextAreaElement;   

    const request = {
      source : "12345678911112",
      destination : this.chosenService,
      relatedBranch : this.chosenBranch,
      description : description.value,
      state : "قيد الانتظار"
    };
    
    this._reviewService.addReview(request);
  }
}
