import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddingReviewRoutingModule } from './adding-review-routing.module';
import { AddingReviewComponent } from './adding-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddingReviewComponent
  ],
  imports: [
    CommonModule,
    AddingReviewRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AddingReviewModule { }
