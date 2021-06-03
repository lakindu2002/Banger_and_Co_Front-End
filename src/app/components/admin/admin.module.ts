import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminInquiryComponent } from './admin-inquiry/admin-inquiry.component';
import { InquiryManageComponent } from './admin-inquiry/inquiry-manage/inquiry-manage.component';
import { InquiryDetailedComponent } from './admin-inquiry/inquiry-detailed/inquiry-detailed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EquipmentManagementComponent } from './equipment-management/equipment-management.component';
import { EquipmentCreateManageComponent } from './equipment-management/equipment-create-manage/equipment-create-manage.component';
import { AdminVehicleManagementComponent } from './admin-vehicle-management/admin-vehicle-management.component';
import { AdminRentalListComponent } from './admin-rental-list/admin-rental-list.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { VehicleCreateUpdateComponent } from './admin-vehicle-management/admin-vehicle-browsing/vehicle-create-update/vehicle-create-update.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminVehicleTypeManagementComponent } from './admin-vehicle-management/admin-vehicle-type-management/admin-vehicle-type-management.component';
import { AdminVehicleBrowsingComponent } from './admin-vehicle-management/admin-vehicle-browsing/admin-vehicle-browsing.component';


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
    AdminVehicleBrowsingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule, //used for reactive driven forms
    FormsModule, //used for template driven forms and ngModel bindings
    MatStepperModule, //angular material stepper module
    NgxSpinnerModule
  ]
})
export class AdminModule { }
