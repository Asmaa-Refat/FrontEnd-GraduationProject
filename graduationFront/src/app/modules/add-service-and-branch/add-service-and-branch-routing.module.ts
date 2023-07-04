import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServiceAndBranchComponent } from './add-service-and-branch.component';

const routes: Routes = [
  {path:'', component: AddServiceAndBranchComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddServiceAndBranchRoutingModule { }
