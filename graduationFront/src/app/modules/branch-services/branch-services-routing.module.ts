import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchServicesComponent } from './branch-services.component';

const routes: Routes = [
  {path:'',  component:BranchServicesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchServicesRoutingModule { }
