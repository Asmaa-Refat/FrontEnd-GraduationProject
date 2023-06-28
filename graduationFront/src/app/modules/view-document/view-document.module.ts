import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewDocumentRoutingModule } from './view-document-routing.module';
import { ViewDocumentComponent } from './view-document.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ViewDocumentComponent
  ],
  imports: [
    CommonModule,
    ViewDocumentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ViewDocumentModule { }
