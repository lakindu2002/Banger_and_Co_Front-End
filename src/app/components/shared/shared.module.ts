import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [PageNotFoundComponent, BreadCrumbComponent],
  imports: [ModalModule.forRoot()],
  exports: [PageNotFoundComponent, ModalModule, BreadCrumbComponent],
})
export class SharedModule { }
