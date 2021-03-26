import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerHomeComponent } from "./customer-home/customer-home.component";

const routes: Routes = [
  {
    path: 'home',
    component: CustomerHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
