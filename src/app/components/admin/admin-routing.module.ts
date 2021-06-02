import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminInquiryComponent } from "./admin-inquiry/admin-inquiry.component";
import { AdminRentalListComponent } from "./admin-rental-list/admin-rental-list.component";
import { AdminUserManagementComponent } from "./admin-user-management/admin-user-management.component";
import { AdminVehicleManagementComponent } from "./admin-vehicle-management/admin-vehicle-management.component";
import { EquipmentManagementComponent } from "./equipment-management/equipment-management.component";

const routes: Routes = [
  {
    path: 'home',
    component: AdminHomeComponent
  },
  {
    path: 'inquiries',
    component: AdminInquiryComponent
  },
  {
    path: 'equipment',
    component: EquipmentManagementComponent
  },
  {
    path: 'vehicles',
    component: AdminVehicleManagementComponent
  },
  {
    path: 'rentals',
    component: AdminRentalListComponent
  },
  {
    path:'users',
    component:AdminUserManagementComponent
  },
  {
    //if base route is hit
    path: '',
    redirectTo: '/admin/home',
    pathMatch: 'full',
    //direct base path route to "home"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
