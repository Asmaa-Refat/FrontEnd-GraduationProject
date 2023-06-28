import { FormGroup, FormControl } from '@angular/forms';
import { ServiceDetailsService } from './../../shared/utilities/services/ServiceDetails/service-details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

  services:any = []
  searchQuery: string = '';
  servicesFilter: any[] = [];
  searchForm: any;

  buttonClicked: boolean = false;


  constructor(private _serviceDetailsService : ServiceDetailsService) { }

  ngOnInit(): void {
    this.getAllServices();
    this.searchForm = new FormGroup({
      searchControl: new FormControl('')
    });  
  }

  getAllServices(){
    this._serviceDetailsService.getAllServices().subscribe(
      (response: any) => {
        this.services = response
        console.log(this.services)  
      },
      (error:any) => {
        console.log(error), alert('something went wrong!!!');
      },
    );
  }

  toggleList(service: any) {
    service.displayDocuments = !service.displayDocuments;
  }

  hasPattern(str: string, pattern: string): boolean {
    return str.includes(pattern);
  }

  normalizedList: any = [];

  filterServices() {
    this.searchQuery = this.searchForm.value.searchControl;    

    if (this.searchQuery === '') {
      this.servicesFilter = this.services;
    } else {

      this.normalizedList = this.services.map((str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      console.log(this.normalizedList);
      this.servicesFilter = this.services.filter((service: { name: string; }) =>
        service.name.includes(this.searchQuery)
      );
    }
    console.log(this.servicesFilter);
  }

}
