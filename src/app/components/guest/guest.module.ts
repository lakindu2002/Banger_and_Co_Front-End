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
import { AboutUsComponent } from './about-us/about-us.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    ContactUsComponent,
    LoginComponent,
    SignUpComponent,
    JumbotronHomeComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: []
})

export class GuestModule { }
