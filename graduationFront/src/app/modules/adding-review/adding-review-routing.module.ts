import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddingReviewComponent } from './adding-review.component';

const routes: Routes = [
  {path:'', component: AddingReviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddingReviewRoutingModule { }
