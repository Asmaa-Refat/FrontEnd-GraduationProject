import { ReviewsComponent } from './modules/reviews/reviews.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login-signup',
    loadChildren: () =>
      import('./modules/login-signup/login-signup.module').then((m) => m.LoginSignupModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'dash-board',
    loadChildren: () =>
      import('./modules/dash-board/dash-board.module').then((m) => m.DashBoardModule)
  },
  {
    path: 'reviews',
    loadChildren: () =>
      import('./modules/reviews/reviews.module').then((m) => m.ReviewsModule)
  },
  {
    path: 'adding-review',
    loadChildren: () =>
      import('./modules/adding-review/adding-review.module').then((m) => m.AddingReviewModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
