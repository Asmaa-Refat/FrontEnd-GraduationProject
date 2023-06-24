import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ScrappingService } from './shared/utilities/services/Scrapping/scrapping.service';
import { LoginService } from './shared/utilities/services/Login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'graduationFront';
  isLoggedIn: any
  constructor(private http: HttpClient, private _scrappingService: ScrappingService, public _loginService : LoginService){

  }

  ngOnInit(){
    this._scrappingService.scrapping().subscribe(
      (response:any) => {
          
      },
      (error) => {
        console.log(error), alert('invalid email or password');
      },
      () => {
        console.log("data added");      
      });
      console.log(this._loginService.isLoggedIn);
      this.isLoggedIn = localStorage.getItem('isLoggedIn')
      

  }
  


  
}
