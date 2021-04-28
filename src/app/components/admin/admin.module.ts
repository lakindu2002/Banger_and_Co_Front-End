import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';



@NgModule({
  declarations: [AdminHomeComponent, AdminNavComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    BsDropdownModule.forRoot()
  ]
})
export class AdminModule { }
