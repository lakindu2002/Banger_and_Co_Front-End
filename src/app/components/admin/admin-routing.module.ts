import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminInquiryComponent } from "./admin-inquiry/admin-inquiry.component";
import { AdminRentalListComponent } from "./admin-rental-list/admin-rental-list.component";
import { ApprovedRentalsComponent } from "./admin-rental-list/approved-rentals/approved-rentals.component";
import { CompletedRentalsComponent } from "./admin-rental-list/completed-rentals/completed-rentals.component";
import { DetailedRentalComponent } from "./admin-rental-list/detailed-rental/detailed-rental.component";
import { OnGoingRentalsComponent } from "./admin-rental-list/on-going-rentals/on-going-rentals.component";
import { PendingRentalsComponent } from "./admin-rental-list/pending-rentals/pending-rentals.component";
import { RejectedRentalsComponent } from "./admin-rental-list/rejected-rentals/rejected-rentals.component";
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
    component: AdminRentalListComponent,
    children: [
      {
        path: 'pending',
        component: PendingRentalsComponent
      },
      {
        path: 'approved',
        component: ApprovedRentalsComponent
      },
      {
        path: 'rejected',
        component: RejectedRentalsComponent
      },
      {
        path: 'on_going',
        component: OnGoingRentalsComponent
      },
      {
        path: 'completed',
        component: CompletedRentalsComponent
      },
      {
        path: '',
        redirectTo: '/admin/rentals/pending',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'rentals/detailed/:rentalId',
    component: DetailedRentalComponent
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
