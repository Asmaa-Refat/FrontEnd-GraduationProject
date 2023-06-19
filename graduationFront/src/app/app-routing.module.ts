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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
