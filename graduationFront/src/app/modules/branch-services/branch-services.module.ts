import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchServicesRoutingModule } from './branch-services-routing.module';
import { BranchServicesComponent } from './branch-services.component';


@NgModule({
  declarations: [
    BranchServicesComponent
  ],
  imports: [
    CommonModule,
    BranchServicesRoutingModule
  ]
})
export class BranchServicesModule { }
