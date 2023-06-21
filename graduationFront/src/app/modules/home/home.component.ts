import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  apps : any = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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
