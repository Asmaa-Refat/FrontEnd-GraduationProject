import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacilityService } from './shared/utilities/services/Facility/facility.service';
import { AgencyService } from './shared/utilities/services/Agency/agency.service';
import { ReviewService } from './shared/utilities/services/Review/review.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AgencyService, FacilityService, ReviewService],
  bootstrap: [AppComponent],
})
export class AppModule {}
