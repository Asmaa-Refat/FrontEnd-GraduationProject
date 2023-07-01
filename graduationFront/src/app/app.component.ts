import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ScrappingService } from './shared/utilities/services/Scrapping/scrapping.service';
import { LoginService } from './shared/utilities/services/Login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'graduationFront';
  isLoggedIn: any;
  isLogin$ = this._loginService.isLoggedIn$;

  constructor(
    private http: HttpClient,
    private _scrappingService: ScrappingService,
    public _loginService: LoginService
  ) {}

  ngOnInit() {
    
    /*this._scrappingService.scrapping().subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error), alert('invalid email or password');
      },
      () => {
        console.log('data added');
      }
    ); */

    this.isLogin$.subscribe((isLogin) => {
      console.log(isLogin);
      this.isLoggedIn = isLogin;
    }); 
  }
}
