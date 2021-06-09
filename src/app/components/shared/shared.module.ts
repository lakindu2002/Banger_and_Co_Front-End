import { NgModule } from "@angular/core";
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from "@angular/common";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    BreadCrumbComponent,
    UserProfileComponent,
    VehicleCardComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    MatCardModule
  ],
  exports: [
    PageNotFoundComponent,
    ModalModule,
    BreadCrumbComponent,
    UserProfileComponent,
    BsDropdownModule,
    VehicleCardComponent],
})
export class SharedModule { }
