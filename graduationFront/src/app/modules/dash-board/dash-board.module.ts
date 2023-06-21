import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashBoardComponent,
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    HttpClientModule,
    ChartModule
  ]
})
export class DashBoardModule { }
