import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';

@NgModule({
  declarations: [PageNotFoundComponent, BreadCrumbComponent],
  imports:[CommonModule],
  exports: [PageNotFoundComponent],
})
export class SharedModule { }
