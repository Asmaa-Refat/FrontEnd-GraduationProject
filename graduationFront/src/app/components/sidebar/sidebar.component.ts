import { Component, OnInit, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/utilities/services/Login/login.service';
import { SideBarToogleService } from 'src/app/shared/utilities/services/SideBarToggle/side-bar-toogle.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  userType :any
  constructor(
    private _sideBarToggleService: SideBarToogleService,
    private _loginService: LoginService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.generateSidebar();
    console.log(this._loginService.userType);
    this.userType = localStorage.getItem('userType')
    
  }

  toggle() {
    this._sideBarToggleService.toggle();
  }

  loginToggle()
  {
    this._loginService.loginToggle();
  }

  generateSidebar() {
    const sidebar: HTMLElement | null = document.querySelector('.sidebar');
    const closeBtn: HTMLElement | null = document.querySelector('#btn');
    const searchBtn: HTMLElement | null = document.querySelector('.bx-search');

    closeBtn?.addEventListener('click', function () {
      sidebar?.classList.toggle('open');
      menuBtnChange();
    });

    searchBtn?.addEventListener('click', function () {
      sidebar?.classList.toggle('open');
      menuBtnChange();
    });

    function menuBtnChange() {
      if (sidebar?.classList.contains('open')) {
        closeBtn?.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        closeBtn?.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    }
  }

  logOut()
  {
    this._router.navigate(['/']);
    localStorage.setItem('isLoggedIn', 'false');
  }

  goToSection(id:any) {
    this._router.navigate(['/admin']).then(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      else{
        console.log("in else ", id);
        
      }
    });
  }
}
