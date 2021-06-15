import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from "./components/guest/about-us/about-us.component";
import { ContactUsComponent } from "./components/guest/contact-us/contact-us.component";
import { FilterVehicleListComponent } from "./components/shared/filter-vehicle-list/filter-vehicle-list.component";
import { HomeComponent } from "./components/guest/home/home.component";
import { JumbotronHomeComponent } from "./components/guest/home/jumbotron-home/jumbotron-home.component";
import { PageNotFoundComponent } from "./components/shared/page-not-found/page-not-found.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  //holds the base paths that come directly after "localhost:4200//{{rootRoute}}"
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'',
        component:JumbotronHomeComponent
      },
      {
        path:'filter',
        component:FilterVehicleListComponent
      }
    ]
  },
  {
    path: 'contactus',
    component: ContactUsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aboutus',
    component: AboutUsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer',
    loadChildren: () => import("./components/customer/customer.module").then((module) => module.CustomerModule),
    canActivate: [AuthGuard]
    //lazy loaded route to improve performance
  },
  {
    path: 'admin',
    loadChildren: () => import("./components/admin/admin.module").then((module) => module.AdminModule),
    canActivate: [AuthGuard]
    //lazy loaded route to improve performance
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    //direct base path route to "home"
  },
  {
    path: "**",
    component: PageNotFoundComponent
    //wildcard route
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
