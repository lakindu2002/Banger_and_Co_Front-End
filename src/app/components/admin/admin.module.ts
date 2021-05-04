import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminInquiryComponent } from './admin-inquiry/admin-inquiry.component';
import { InquiryManageComponent } from './admin-inquiry/inquiry-manage/inquiry-manage.component';


@NgModule({
  declarations: [AdminHomeComponent,AdminNavComponent, AdminInquiryComponent, InquiryManageComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
