import { NgModule } from "@angular/core";
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehicleRentalFilterPopUpComponent } from './vehicle-rental-filter-pop-up/vehicle-rental-filter-pop-up.component';
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    BreadCrumbComponent,
    UserProfileComponent,
    VehicleCardComponent,
    VehicleRentalFilterPopUpComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TimepickerModule.forRoot()
  ],
  exports: [
    PageNotFoundComponent,
    ModalModule,
    BreadCrumbComponent,
    UserProfileComponent,
    BsDropdownModule,
    VehicleCardComponent,
    VehicleRentalFilterPopUpComponent
  ],
})
export class SharedModule { }
