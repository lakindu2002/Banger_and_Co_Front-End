import { NgModule } from "@angular/core";

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from "@angular/router";
import { JumbotronHomeComponent } from './home/jumbotron-home/jumbotron-home.component';

import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [NavBarComponent, HomeComponent, ContactUsComponent, LoginComponent, SignUpComponent, JumbotronHomeComponent],
  imports: [RouterModule, ReactiveFormsModule, SharedModule],
  exports: []
})

export class GuestModule { }
