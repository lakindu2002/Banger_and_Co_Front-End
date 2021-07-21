import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerNavComponent } from './customer-nav/customer-nav.component';
import { VehiclePanelComponent } from './vehicle-panel/vehicle-panel.component';
import { RentVehicleComponent } from './rent-vehicle/rent-vehicle.component';
import { ShowAvailableAdditionalEquipmentComponent } from './rent-vehicle/show-available-additional-equipment/show-available-additional-equipment.component';
import { TotalCostComponent } from './rent-vehicle/total-cost/total-cost.component';
import { MakeRentalComponent } from './rent-vehicle/make-rental/make-rental.component';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerNavComponent,
    VehiclePanelComponent,
    RentVehicleComponent,
    ShowAvailableAdditionalEquipmentComponent,
    TotalCostComponent,
    MakeRentalComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    MatStepperModule
  ]
})
export class CustomerModule { }
