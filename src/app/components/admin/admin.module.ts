import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatStepperModule } from '@angular/material/stepper';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminInquiryComponent } from './admin-inquiry/admin-inquiry.component';
import { InquiryManageComponent } from './admin-inquiry/inquiry-manage/inquiry-manage.component';
import { InquiryDetailedComponent } from './admin-inquiry/inquiry-detailed/inquiry-detailed.component';
import { EquipmentManagementComponent } from './equipment-management/equipment-management.component';
import { EquipmentCreateManageComponent } from './equipment-management/equipment-create-manage/equipment-create-manage.component';
import { AdminVehicleManagementComponent } from './admin-vehicle-management/admin-vehicle-management.component';
import { AdminRentalListComponent } from './admin-rental-list/admin-rental-list.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { VehicleCreateUpdateComponent } from './admin-vehicle-management/admin-vehicle-browsing/vehicle-create-update/vehicle-create-update.component';
import { AdminVehicleTypeManagementComponent } from './admin-vehicle-management/admin-vehicle-type-management/admin-vehicle-type-management.component';
import { AdminVehicleBrowsingComponent } from './admin-vehicle-management/admin-vehicle-browsing/admin-vehicle-browsing.component';
import { VehicleTypeCreateManageComponent } from './admin-vehicle-management/admin-vehicle-type-management/vehicle-type-create-manage/vehicle-type-create-manage.component';
import { TypeDeletePromptComponent } from './admin-vehicle-management/admin-vehicle-type-management/type-delete-prompt/type-delete-prompt.component';
import { WhiteListPromptComponent } from './admin-user-management/white-list-prompt/white-list-prompt.component';
import { DeleteEquipmentPromptComponent } from './equipment-management/delete-equipment-prompt/delete-equipment-prompt.component';
import { RemoveVehiclePromptComponent } from './admin-vehicle-management/admin-vehicle-browsing/remove-vehicle-prompt/remove-vehicle-prompt.component';
import { AdministratorListComponent } from './admin-user-management/administrator-list/administrator-list.component';
import { AdminCreateComponent } from './admin-user-management/administrator-list/admin-create/admin-create.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AdminDeleteComponent } from './admin-user-management/administrator-list/admin-delete/admin-delete.component';
import { RentalTableListComponent } from './admin-rental-list/rental-table-list/rental-table-list.component';
import { PendingRentalsComponent } from './admin-rental-list/pending-rentals/pending-rentals.component';
import { SectionHeaderComponent } from './admin-rental-list/section-header/section-header.component';



@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminNavComponent,
    AdminInquiryComponent,
    InquiryManageComponent,
    InquiryDetailedComponent,
    EquipmentManagementComponent,
    EquipmentCreateManageComponent,
    AdminVehicleManagementComponent,
    AdminRentalListComponent, AdminUserManagementComponent,
    VehicleCreateUpdateComponent,
    AdminVehicleTypeManagementComponent,
    AdminVehicleBrowsingComponent,
    VehicleTypeCreateManageComponent,
    TypeDeletePromptComponent,
    WhiteListPromptComponent,
    DeleteEquipmentPromptComponent,
    RemoveVehiclePromptComponent,
    AdministratorListComponent,
    AdminCreateComponent,
    AdminDeleteComponent,
    RentalTableListComponent,
    PendingRentalsComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule, //used for reactive driven forms
    FormsModule, //used for template driven forms and ngModel bindings
    MatStepperModule, //angular material stepper module
    NgxSpinnerModule, //used to load the spinner when creating vehicle types and loading image on image preview before vehicle creation
    MatDatepickerModule
  ]
})
export class AdminModule { }
