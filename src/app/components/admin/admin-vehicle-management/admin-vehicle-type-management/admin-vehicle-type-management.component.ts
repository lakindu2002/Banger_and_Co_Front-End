import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { VehicleCreateUpdateComponent } from '../admin-vehicle-browsing/vehicle-create-update/vehicle-create-update.component';

@Component({
  selector: 'app-admin-vehicle-type-management',
  templateUrl: './admin-vehicle-type-management.component.html',
  styleUrls: ['./admin-vehicle-type-management.component.css']
})
export class AdminVehicleTypeManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



}
