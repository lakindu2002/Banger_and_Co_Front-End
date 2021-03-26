import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from "./components/guest/about-us/about-us.component";
import { ContactUsComponent } from "./components/guest/contact-us/contact-us.component";
import { HomeComponent } from "./components/guest/home/home.component";
import { PageNotFoundComponent } from "./components/shared/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contactus',
    component: ContactUsComponent
  },
  {
    path: 'aboutus',
    component: AboutUsComponent
  },
  {
    path: 'customer',
    loadChildren: () => import("./components/customer/customer.module").then((module) => module.CustomerModule)
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
