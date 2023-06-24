import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'highcharts';
import { ScrappingService } from 'src/app/shared/utilities/services/Scrapping/scrapping.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  apps : any = []
  constructor(private http: HttpClient, private _scrappingSerivce: ScrappingService) { }

  ngOnInit(): void {
    this._scrappingSerivce.scrapping().subscribe(
      (response:any) => {
          
      },
      (error) => {
        console.log(error), alert('invalid email or password');
      },
      () => {  
        console.log("data added");      
      });
    //getAllApps() {
    
      this.http
        .get('http://127.0.0.1:8000/allApps/')
        .subscribe({
          next: (response) => {
            console.log(response);
            this.apps = response;
          },
        });
   // }
  }

  goToApp(id: any){

  }

  

  
}
