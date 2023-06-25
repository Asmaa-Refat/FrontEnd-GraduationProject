import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarToogleService {
  
  
  constructor() { }

  private isOpenSideBar = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSideBar.asObservable();

  toggle() {
    this.isOpenSideBar.next(!this.isOpenSideBar.value);
  }
}
