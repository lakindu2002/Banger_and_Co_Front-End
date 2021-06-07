import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { VehicleCreateUpdateComponent } from './vehicle-create-update/vehicle-create-update.component';

@Component({
  selector: 'app-admin-vehicle-browsing',
  templateUrl: './admin-vehicle-browsing.component.html',
  styleUrls: ['./admin-vehicle-browsing.component.css']
})
export class AdminVehicleBrowsingComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef; //holds a reference to the opened modal
  vehicleTypeList: VehicleType[] = [];

  vehicleList: Vehicle[] = [];
  vehicleLoadError: boolean = false;

  successSubscription: Subscription;

  constructor(
    private toast: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private vehicleTypeService: VehicleTypeService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.getAllVehicleTypes();
    this.getAllVehicles();
  }

  launchCreateModal() {
    //launch the create vehicle modal
    this.modalRef = this.modalService.show(VehicleCreateUpdateComponent,
      //configure initial state
      {
        animated: true,
        ignoreBackdropClick: true,
        keyboard: false,
        class: 'modal-lg modal-dialog-centered'
      }
    )
    //subscribe to the content emitted by the subject in the component
    this.successSubscription = this.modalRef.content.isSuccess.subscribe((data) => {
      if (data == true) {
        this.getAllVehicles();
      }
    })
  }

  getAllVehicles(): void {
    this.spinner.show();
    this.vehicleLoadError = false;

    this.vehicleService.getAllVehicles().subscribe((data: Vehicle[]) => {
      this.vehicleList = data;
      this.vehicleLoadError = false;

      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Failed to Load all Vehicles");
      this.vehicleLoadError = true;

      this.spinner.hide();
    })
  }

  getAllVehicleTypes(): void {
    this.vehicleTypeService.getAllVehicleTypes().subscribe((data) => {
      this.vehicleTypeList = data;
    })
  }

  ngOnDestroy() {
    //if subscription is active, unsubscribe
    if (this.successSubscription) {
      this.successSubscription.unsubscribe();
    }
  }
}
