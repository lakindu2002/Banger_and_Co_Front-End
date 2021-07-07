import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerHomeComponent } from "./customer-home/customer-home.component";
import { RentVehicleComponent } from "./rent-vehicle/rent-vehicle.component";
import { VehiclePanelComponent } from "./vehicle-panel/vehicle-panel.component";

const routes: Routes = [
  //holds the routes after "/customer" that is loaded via lazy loading
  {
    path: 'home',
    component: CustomerHomeComponent
  },
  {
    path: 'home/filter',
    component: VehiclePanelComponent
  },
  {
    path:'home/rent/:vehicleId',
    component:RentVehicleComponent
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
