import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminInquiryComponent } from './admin-inquiry/admin-inquiry.component';
import { InquiryManageComponent } from './admin-inquiry/inquiry-manage/inquiry-manage.component';
import { InquiryDetailedComponent } from './admin-inquiry/inquiry-detailed/inquiry-detailed.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminHomeComponent,AdminNavComponent, AdminInquiryComponent, InquiryManageComponent, InquiryDetailedComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
