import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [PageNotFoundComponent, BreadCrumbComponent, UserProfileComponent],
  imports: [ModalModule.forRoot()],
  exports: [PageNotFoundComponent, ModalModule, BreadCrumbComponent, UserProfileComponent],
})
export class SharedModule { }
