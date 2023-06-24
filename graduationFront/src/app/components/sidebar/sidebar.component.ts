import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public isSideBarOpened :boolean = false

  constructor() { }

  ngOnInit(): void {
    this.generateSidebar();
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

 
}
