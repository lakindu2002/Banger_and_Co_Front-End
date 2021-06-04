import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { VehicleType } from 'src/app/models/vehicleType.model';
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

  successSubscription: Subscription;

  constructor(
    private toast: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private vehicleTypeService: VehicleTypeService,
  ) { }

  ngOnInit(): void {
    this.getAllVehicleTypes();
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
