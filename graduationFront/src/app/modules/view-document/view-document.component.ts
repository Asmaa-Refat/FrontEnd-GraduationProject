import { FormGroup, FormControl } from '@angular/forms';
import { ServiceDetailsService } from './../../shared/utilities/services/ServiceDetails/service-details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss'],
})
export class ViewDocumentComponent implements OnInit {
  services: any = [];
  searchQuery: string = '';
  servicesFilter: any[] = [];
  searchForm: any;
  filterResult: boolean = false;
  noData: boolean = false;
  buttonClicked: boolean = false;

  constructor(private _serviceDetailsService: ServiceDetailsService) {}

  ngOnInit(): void {
    this.getAllServices();
    this.searchForm = new FormGroup({
      searchControl: new FormControl(''),
    });

    setInterval(() => {
      this.checkSearchQuery();
    }, 500);

    this.filterResult = false;
  }

  checkSearchQuery(){
    if (this.searchQuery === '') {
      this.servicesFilter = this.services;
    }
  }


  getAllServices() {
    this._serviceDetailsService.getAllServices().subscribe(
      (response: any) => {
        this.services = response;
        console.log(this.services);
      },
      (error: any) => {
        console.log(error), alert('something went wrong!!!');
      }
    );
  }

  toggleList(service: any) {
    service.displayDocuments = !service.displayDocuments;
  }

  hasPattern(str: string, pattern: string): boolean {
    return str.includes(pattern);
  }
  normalizedServiceName: any;
  queryTemp: any
  filterServices() {
    this.searchQuery = this.searchForm.value.searchControl;

    this.queryTemp = this.removeArabicDiacritics(this.searchQuery);

    if (this.queryTemp === '') {
      this.servicesFilter = this.services;
    } else {
      this.servicesFilter = this.services.filter(
        (service: { name: string }) => {
          this.normalizedServiceName = this.removeArabicDiacritics(service.name)        
          return this.normalizedServiceName.includes(this.queryTemp) 
          //service.name.includes(this.searchQuery)
        });
    }
    if (this.servicesFilter.length > 0) {
      console.log(this.servicesFilter);
      this.noData = false;
    } else {
      console.log('No matching data found.');
      this.noData = true;
    }
    this.filterResult = true;
  }

  removeArabicDiacritics(str: any) {
    str = str.replace(/[\u064B-\u065F\u0670]|/g, ''); //التشكيل
    str = str.replace(/ة/g, 'ه');
    str = str.replace(/ي|ئ/g ,'ى');
    str = str.replace(/[إأٱآا]/g ,'ا');
    return str;
  }

}
