import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewDocumentRoutingModule } from './view-document-routing.module';
import { ViewDocumentComponent } from './view-document.component';


@NgModule({
  declarations: [
    ViewDocumentComponent
  ],
  imports: [
    CommonModule,
    ViewDocumentRoutingModule
  ]
})
export class ViewDocumentModule { }
