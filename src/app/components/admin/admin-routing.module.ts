import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminInquiryComponent } from "./admin-inquiry/admin-inquiry.component";
import { AdminRentalListComponent } from "./admin-rental-list/admin-rental-list.component";
import { AdminUserManagementComponent } from "./admin-user-management/admin-user-management.component";
import { AdministratorListComponent } from "./admin-user-management/administrator-list/administrator-list.component";
import { AdminVehicleBrowsingComponent } from "./admin-vehicle-management/admin-vehicle-browsing/admin-vehicle-browsing.component";
import { AdminVehicleManagementComponent } from "./admin-vehicle-management/admin-vehicle-management.component";
import { AdminVehicleTypeManagementComponent } from "./admin-vehicle-management/admin-vehicle-type-management/admin-vehicle-type-management.component";
import { EquipmentManagementComponent } from "./equipment-management/equipment-management.component";

const routes: Routes = [
  //holds the routes after "/admin" that is loaded via lazy loading
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
    component: AdminVehicleManagementComponent,
    children: [
      {
        path: '',
        component: AdminVehicleBrowsingComponent
      },
      {
        path: 'vehicleType',
        component: AdminVehicleTypeManagementComponent
      }
    ]
  },
  {
    path: 'rentals',
    component: AdminRentalListComponent
  },
  {
    path: 'users',
    component: AdminUserManagementComponent
  },
  {
    path: 'users/admin',
    component: AdministratorListComponent
  },
  {
    //if base route is hit
    path: '',
    redirectTo: '/admin/home',
    pathMatch: 'full',
    //direct base path route to "/admin/home"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
