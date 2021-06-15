import { NgModule } from "@angular/core";
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from "@angular/material/datepicker";

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { VehicleRentalFilterPopUpComponent } from './vehicle-rental-filter-pop-up/vehicle-rental-filter-pop-up.component';
import { MatNativeDateModule } from "@angular/material/core";
import { FilterVehicleListComponent } from "./filter-vehicle-list/filter-vehicle-list.component";

@NgModule({
  declarations: [
    PageNotFoundComponent,
    BreadCrumbComponent,
    UserProfileComponent,
    VehicleCardComponent,
    VehicleRentalFilterPopUpComponent,
    FilterVehicleListComponent
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
  ],
  exports: [
    PageNotFoundComponent,
    ModalModule,
    BreadCrumbComponent,
    UserProfileComponent,
    BsDropdownModule,
    VehicleCardComponent,
    VehicleRentalFilterPopUpComponent,
    FilterVehicleListComponent
  ],
})
export class SharedModule { }
