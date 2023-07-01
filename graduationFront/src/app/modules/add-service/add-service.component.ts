import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  services:any = []
  showAlert: any = 0

  constructor() { }

  ngOnInit(): void {
  }

  generateServices() {
    throw new Error('Method not implemented.');
  }

  onSelectService(event :any){

  }

}
