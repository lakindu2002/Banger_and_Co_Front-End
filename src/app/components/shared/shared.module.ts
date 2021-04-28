import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [PageNotFoundComponent, BreadCrumbComponent, UserProfileComponent],
  imports: [CommonModule, ModalModule.forRoot(),ReactiveFormsModule, BsDropdownModule.forRoot()],
  exports: [PageNotFoundComponent, ModalModule, BreadCrumbComponent, UserProfileComponent,BsDropdownModule],
})
export class SharedModule { }
