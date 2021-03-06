import { NgModule } from "@angular/core";
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatNativeDateModule } from "@angular/material/core";

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehicleRentalFilterPopUpComponent } from './vehicle-rental-filter-pop-up/vehicle-rental-filter-pop-up.component';
import { FilterVehicleListComponent } from "./filter-vehicle-list/filter-vehicle-list.component";
import { ShowUserImagesComponent } from './user-profile/show-user-images/show-user-images.component';
import { ShowVehicleOnRentalComponent } from '../shared/show-vehicle-on-rental/show-vehicle-on-rental.component';
import { DetailedAdOnsComponent } from "./detailed-ad-ons/detailed-ad-ons.component";
import { UserIdentificationComponent } from "./user-identification/user-identification.component";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    BreadCrumbComponent,
    UserProfileComponent,
    VehicleCardComponent,
    VehicleRentalFilterPopUpComponent,
    FilterVehicleListComponent,
    ShowUserImagesComponent,
    ShowVehicleOnRentalComponent,
    DetailedAdOnsComponent,
    UserIdentificationComponent,
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxSpinnerModule
  ],
  exports: [
    PageNotFoundComponent,
    ModalModule,
    BreadCrumbComponent,
    UserProfileComponent,
    BsDropdownModule,
    VehicleCardComponent,
    VehicleRentalFilterPopUpComponent,
    FilterVehicleListComponent,
    MatCardModule,
    NgxSpinnerModule,
    ShowVehicleOnRentalComponent,
    DetailedAdOnsComponent,
    UserIdentificationComponent,
  ],
})
export class SharedModule { }
