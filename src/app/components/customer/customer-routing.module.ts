import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerHomeComponent } from "./customer-home/customer-home.component";

const routes: Routes = [
    //holds the routes after "/customer" that is loaded via lazy loading
  {
    path: 'home',
    component: CustomerHomeComponent
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
