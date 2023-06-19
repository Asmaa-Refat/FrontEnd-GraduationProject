import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/components/header/header.component';


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
