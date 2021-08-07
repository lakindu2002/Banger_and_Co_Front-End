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
import { CustomerRentalComponent } from './customer-rental/customer-rental.component';
import { CustomerPendingComponent } from './customer-rental/customer-pending/customer-pending.component';
import { CustomerApprovedComponent } from './customer-rental/customer-approved/customer-approved.component';
import { CustomerOnGoingComponent } from './customer-rental/customer-on-going/customer-on-going.component';
import { CustomerPastComponent } from './customer-rental/customer-past/customer-past.component';
import { CustomerRejectedComponent } from './customer-rental/customer-rejected/customer-rejected.component';
import { CustomerRentalCardComponent } from './customer-rental/customer-rental-card/customer-rental-card.component';
import { CustomerRentalDetailedComponent } from './customer-rental/customer-rental-detailed/customer-rental-detailed.component';
import { RentalLateReturnPopUpComponent } from './customer-rental/customer-rental-detailed/rental-late-return-pop-up/rental-late-return-pop-up.component';
import { UpdateRentalTimeComponent } from './customer-rental/customer-rental-detailed/update-rental-time/update-rental-time.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerNavComponent,
    VehiclePanelComponent,
    RentVehicleComponent,
    ShowAvailableAdditionalEquipmentComponent,
    TotalCostComponent,
    MakeRentalComponent,
    CustomerRentalComponent,
    CustomerPendingComponent,
    CustomerApprovedComponent,
    CustomerOnGoingComponent,
    CustomerPastComponent,
    CustomerRejectedComponent,
    CustomerRentalCardComponent,
    CustomerRentalDetailedComponent,
    RentalLateReturnPopUpComponent,
    UpdateRentalTimeComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    MatStepperModule,
    FormsModule
  ]
})
export class CustomerModule { }
