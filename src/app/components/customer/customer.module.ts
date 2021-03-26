import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerNavComponent } from './customer-nav/customer-nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [CustomerHomeComponent, CustomerNavComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    BsDropdownModule.forRoot()
  ]
})
export class CustomerModule { }
