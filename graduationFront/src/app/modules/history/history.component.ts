import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/shared/utilities/services/History/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private _historyService: HistoryService) { }
  reviews: any

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
  }

}
