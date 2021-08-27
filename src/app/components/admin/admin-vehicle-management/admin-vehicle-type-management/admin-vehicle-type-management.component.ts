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
import { TypeDeletePromptComponent } from './type-delete-prompt/type-delete-prompt.component';
import { VehicleTypeCreateManageComponent } from './vehicle-type-create-manage/vehicle-type-create-manage.component';

@Component({
  selector: 'app-admin-vehicle-type-management',
  templateUrl: './admin-vehicle-type-management.component.html',
  styleUrls: ['./admin-vehicle-type-management.component.css']
})
export class AdminVehicleTypeManagementComponent implements OnInit {

  allTypes: VehicleType[] = [];
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
      class: "modal-xl modal-dialog-centered",
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

  openEditTypeModal(equipmentId: number): void {
    this.spinner.show();
    this.vehicleTypeService.findById(equipmentId).subscribe((data: VehicleType) => {

      this.bsModalRef = this.modalService.show(VehicleTypeCreateManageComponent, {
        class: "modal-xl modal-dialog-centered",
        keyboard: false,
        ignoreBackdropClick: true,
        initialState: {
          createMode: false,
          typeUpdated: data,
        }
      });

      //observe for values emitted by the "isSuccess" subject by observing
      this.popupSubscription = this.bsModalRef.content.isSuccess.subscribe((data: boolean) => {
        //the creation occured successfully
        this.getAllTypes(); //retrieve all the types from the database to refresh the table.
      })

      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Single Vehicle Type Information Not Loaded")
      this.spinner.hide();
    })
  }

  openDeleteModal(vehicleTypeId: number): void {
    this.bsModalRef = this.modalService.show(TypeDeletePromptComponent, {
      animated: true,
      class: 'modal-dialog-centered',
      keyboard: false,
      ignoreBackdropClick: true,
      initialState: {
        deleteId: vehicleTypeId //assign the vehicle type id to the modal property deleteId
      }
    })

    this.popupSubscription = this.bsModalRef.content.deleteSuccess.subscribe((data) => {
      this.getAllTypes();
    })
  }

  ngOnDestory(): void {
    //on destroy of this component, unsubscribe from popupSubscription is a subscription is active
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }
}
