import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddingReviewRoutingModule } from './adding-review-routing.module';
import { AddingReviewComponent } from './adding-review.component';


@NgModule({
  declarations: [
    AddingReviewComponent
  ],
  imports: [
    CommonModule,
    AddingReviewRoutingModule
  ]
})
export class AddingReviewModule { }
