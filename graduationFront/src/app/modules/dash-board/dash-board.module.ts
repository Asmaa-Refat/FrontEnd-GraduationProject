import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashBoardComponent,
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartModule
  ]
})
export class DashBoardModule { }
