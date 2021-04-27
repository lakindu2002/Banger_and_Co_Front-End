import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { SharedModule } from "../shared/shared.module";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminRoutingModule } from "./admin.routing.module";
import { AdminNavComponent } from './admin-nav/admin-nav.component';

@NgModule({
  declarations: [AdminHomeComponent, AdminNavComponent],
  imports: [AdminRoutingModule, CommonModule, SharedModule, BsDropdownModule.forRoot()],
})
export class AdminModule { }
