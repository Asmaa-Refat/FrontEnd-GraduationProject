import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginSignupRoutingModule } from './login|signup-routing.module';
import { LoginSignupComponent } from './login|signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginSignupComponent],
  imports: [
    CommonModule,
    LoginSignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class LoginSignupModule {}
