import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDocumentComponent } from './view-document.component';

const routes: Routes = [
  {path: '', component: ViewDocumentComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDocumentRoutingModule { }
