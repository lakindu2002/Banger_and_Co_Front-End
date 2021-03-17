import { NgModule } from "@angular/core";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [NavBarComponent, HomeComponent, ContactUsComponent, LoginComponent, SignUpComponent],
  imports: [],
  exports: []
})

export class GuestModule { }
