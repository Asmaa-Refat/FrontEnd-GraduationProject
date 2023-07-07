import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/shared/utilities/services/History/history.service';
import { SideBarToogleService } from 'src/app/shared/utilities/services/SideBarToggle/side-bar-toogle.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private _historyService: HistoryService,private _sideBarToggleService: SideBarToogleService,
    ) { }
  reviews: any
  isOpen$ = this._sideBarToggleService.isOpen$;


  ngOnInit(): void {

    let request = {
      email: localStorage.getItem('email')
    };

    this._historyService.getHistory(request).subscribe(
      (response) => {
        console.log("this",response); 
        this.reviews = response; 
      },
      (error) => {
        console.log('Error: ', error);
      }
    );

    this.isOpen$.subscribe((isOpen: any) => {
      const content = document.getElementById('main-content') as HTMLElement;
      if (isOpen) {
         content.style.width = '90%';
      } else {
        content.style.width = '100%';
      }
    });
  }

}
