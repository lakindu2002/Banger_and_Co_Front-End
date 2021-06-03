import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { VehicleCreateUpdateComponent } from '../admin-vehicle-browsing/vehicle-create-update/vehicle-create-update.component';
import { VehicleTypeCreateManageComponent } from './vehicle-type-create-manage/vehicle-type-create-manage.component';

@Component({
  selector: 'app-admin-vehicle-type-management',
  templateUrl: './admin-vehicle-type-management.component.html',
  styleUrls: ['./admin-vehicle-type-management.component.css']
})
export class AdminVehicleTypeManagementComponent implements OnInit {

  allTypes: VehicleType[];
  isError: boolean = false;
  bsModalRef: BsModalRef

  popupSubscription: Subscription;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private vehicleTypeService: VehicleTypeService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllTypes();
  }

  getAllTypes() {
    this.spinner.show();
    this.isError = false;
    this.allTypes = [];

    this.vehicleTypeService.getAllVehicleTypes().subscribe((data: VehicleType[]) => {
      //retrieve all vehicle types successfully
      this.allTypes = data
      this.spinner.hide();

    }, (error: ErrorResponse) => {
      this.isError = true;
      this.toast.error(error.exceptionMessage, "Vehicle Types Not Loaded");
      this.spinner.hide();

    })
  }

  launchCreateVehicleTypeModal(): void {
    //open the create vehicle type manage component in the create mode by passing initial state create mode to true
    this.bsModalRef = this.modalService.show(VehicleTypeCreateManageComponent, {
      class: "modal-md modal-dialog-centered",
      keyboard: false,
      ignoreBackdropClick: true,
      initialState: {
        createMode: true
      }
    });

    //observe for values emitted by the "isSuccess" subject by observing
    this.popupSubscription = this.bsModalRef.content.isSuccess.subscribe((data: boolean) => {
      //the creation occured successfully
      this.getAllTypes(); //retrieve all the types from the database to refresh the table.
    })
  }

  ngOnDestory(): void {
    //on destroy of this component, unsubscribe from popupSubscription is a subscription is active
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }
}
