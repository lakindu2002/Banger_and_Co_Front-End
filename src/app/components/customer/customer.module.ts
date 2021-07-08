import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerNavComponent } from './customer-nav/customer-nav.component';
import { VehiclePanelComponent } from './vehicle-panel/vehicle-panel.component';
import { RentVehicleComponent } from './rent-vehicle/rent-vehicle.component';
import { ShowVehicleOnRentalComponent } from './rent-vehicle/show-vehicle-on-rental/show-vehicle-on-rental.component';
import { ShowAvailableAdditionalEquipmentComponent } from './rent-vehicle/show-available-additional-equipment/show-available-additional-equipment.component';
import { TotalCostComponent } from './rent-vehicle/total-cost/total-cost.component';


@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerNavComponent,
    VehiclePanelComponent,
    RentVehicleComponent,
    ShowVehicleOnRentalComponent,
    ShowAvailableAdditionalEquipmentComponent,
    TotalCostComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
  ]
})
export class CustomerModule { }
