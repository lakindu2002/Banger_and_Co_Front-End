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


@NgModule({
  declarations: [AdminHomeComponent,AdminNavComponent, AdminInquiryComponent, InquiryManageComponent, InquiryDetailedComponent, EquipmentManagementComponent, EquipmentCreateManageComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
