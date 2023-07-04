import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddServiceAndBranchComponent } from './add-service-and-branch.component';
import { AddServiceAndBranchRoutingModule } from './add-service-and-branch-routing.module';


@NgModule({
  declarations: [
    AddServiceAndBranchComponent
  ],
  imports: [
    CommonModule,
    AddServiceAndBranchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AddServiceAndBranchModule { }
