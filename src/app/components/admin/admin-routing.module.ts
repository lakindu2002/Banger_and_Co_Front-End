import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminInquiryComponent } from "./admin-inquiry/admin-inquiry.component";
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
