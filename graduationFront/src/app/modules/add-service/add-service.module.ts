import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddServiceRoutingModule } from './add-service-routing.module';
import { AddServiceComponent } from './add-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddServiceComponent
  ],
  imports: [
    CommonModule,
    AddServiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AddServiceModule { }
