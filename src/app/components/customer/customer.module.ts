import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerNavComponent } from './customer-nav/customer-nav.component';
import { VehiclePanelComponent } from './vehicle-panel/vehicle-panel.component';


@NgModule({
  declarations: [CustomerHomeComponent, CustomerNavComponent, VehiclePanelComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
  ]
})
export class CustomerModule { }
