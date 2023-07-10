import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGuardGuard } from './shared/utilities/gurad/my-guard.guard';

const routes: Routes = [
  {
    path: 'login-signup',
    loadChildren: () =>
      import('./modules/login-signup/login-signup.module').then(
        (m) => m.LoginSignupModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
     canActivate: [MyGuardGuard] 

  },
  {
    path: 'dash-board',
    loadChildren: () =>
      import('./modules/dash-board/dash-board.module').then(
        (m) => m.DashBoardModule
      ),
      canActivate: [MyGuardGuard] 
  },
  {
    path: 'add-review',
    loadChildren: () =>
      import('./modules/adding-review/adding-review.module').then(
        (m) => m.AddingReviewModule
      ),
      canActivate: [MyGuardGuard] 
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
      canActivate: [MyGuardGuard] 
  },
  {
    path: 'view-document',
    loadChildren: () =>
      import('./modules/view-document/view-document.module').then((m) => m.ViewDocumentModule),
      canActivate: [MyGuardGuard] 
  },
  {
    path: 'apps',
    loadChildren: () =>
      import('./modules/apps/apps.module').then((m) => m.AppsModule),
      canActivate: [MyGuardGuard] 
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
      canActivate: [MyGuardGuard] 
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/landing-page/landing-page.module').then((m) => m.LandingPageModule),
      
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./modules/history/history.module').then((m) => m.HistoryModule),
      canActivate: [MyGuardGuard] 
  },
  {
    path: 'add-service-and-branch',
    loadChildren: () =>
      import('./modules/add-service-and-branch/add-service-and-branch.module').then((m) => m.AddServiceAndBranchModule),
      canActivate: [MyGuardGuard] 
  },
  {
    path: 'branchServices',
    loadChildren: () =>
      import('./modules/branch-services/branch-services.module').then((m) => m.BranchServicesModule),
      canActivate: [MyGuardGuard] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
