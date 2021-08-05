import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerHomeComponent } from "./customer-home/customer-home.component";
import { CustomerApprovedComponent } from "./customer-rental/customer-approved/customer-approved.component";
import { CustomerOnGoingComponent } from "./customer-rental/customer-on-going/customer-on-going.component";
import { CustomerPastComponent } from "./customer-rental/customer-past/customer-past.component";
import { CustomerPendingComponent } from "./customer-rental/customer-pending/customer-pending.component";
import { CustomerRejectedComponent } from "./customer-rental/customer-rejected/customer-rejected.component";
import { CustomerRentalDetailedComponent } from "./customer-rental/customer-rental-detailed/customer-rental-detailed.component";
import { CustomerRentalComponent } from "./customer-rental/customer-rental.component";
import { RentVehicleComponent } from "./rent-vehicle/rent-vehicle.component";
import { VehiclePanelComponent } from "./vehicle-panel/vehicle-panel.component";

const routes: Routes = [
  //holds the routes after "/customer" that is loaded via lazy loading
  {
    path: 'home',
    component: CustomerHomeComponent
  },
  {
    path: 'rentals/filter',
    component: VehiclePanelComponent
  },
  {
    path: 'home/rent/:vehicleId',
    component: RentVehicleComponent
  },
  {
    path: 'rentals',
    component: CustomerRentalComponent,
    children: [
      {
        path: '',
        redirectTo: '/customer/rentals/pending',
        pathMatch: 'full'
      },
      {
        path: 'pending',
        component: CustomerPendingComponent,
      },
      {
        path: 'approved',
        component: CustomerApprovedComponent,
      },
      {
        path: 'on-going',
        component: CustomerOnGoingComponent
      },
      {
        path: 'past',
        component: CustomerPastComponent,
      },
      {
        path: 'rejected',
        component: CustomerRejectedComponent
      },
    ],
  },
  {
    path: 'rentals/detailed/:rentalId',
    component: CustomerRentalDetailedComponent
  },
  {
    path: '',
    redirectTo: '/customer/home',
    pathMatch: 'full',
    //direct base path route to "home"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
