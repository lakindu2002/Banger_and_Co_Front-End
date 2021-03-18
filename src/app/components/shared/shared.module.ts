import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [PageNotFoundComponent, BreadCrumbComponent],
  imports: [CommonModule, ModalModule.forRoot()],
  exports: [PageNotFoundComponent, ModalModule, BreadCrumbComponent, CommonModule],
})
export class SharedModule { }
