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
import { RemoveVehiclePromptComponent } from './remove-vehicle-prompt/remove-vehicle-prompt.component';
import { VehicleCreateUpdateComponent } from './vehicle-create-update/vehicle-create-update.component';

@Component({
  selector: 'app-admin-vehicle-browsing',
  templateUrl: './admin-vehicle-browsing.component.html',
  styleUrls: ['./admin-vehicle-browsing.component.css']
})
export class AdminVehicleBrowsingComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef; //holds a reference to the opened modal
  vehicleTypeList: VehicleType[] = [];

  enteredName: string = "";
  vehicleSelector: string = "all";

  vehicleList: Vehicle[] = [];
  filteredList: Vehicle[] = []; //used to handle the filtered data
  vehicleLoadError: boolean = false;

  successSubscription: Subscription;
  removeSub: Subscription;
  editedSub: Subscription;

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
        this.getAllVehicleTypes();
      }
    })
  }

  getAllVehicles(): void {
    this.spinner.show();
    this.vehicleLoadError = false;

    this.vehicleService.getAllVehicles().subscribe((data: Vehicle[]) => {
      this.vehicleList = data;
      this.filteredList = this.vehicleList; //assign the filtered list as vehicle list so when filter is reset, vehicle list can be set
      //as filtered list to render all vehicles.
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

  filterVehicles(typeId: number | string): void {
    this.spinner.show();
    this.enteredName = ""; //searching by a filter, not by name so empty it.
    if (typeId === 'all') {
      //if user wishes to view all
      this.filteredList = this.vehicleList; //all vehicles will be displayed
    } else {
      //filter according to type id passed and type id of each vehicle.
      this.filteredList = this.vehicleList.filter((eachVehicle) => {
        if (eachVehicle.vehicleType.vehicleTypeId == typeId) {
          //if the vehicle type id is of the type id passed from the filter, return it to filter list.
          //the vehicle type id passed from select will be the type ids stored in the database as value assign to it actual db id.
          //so thats why this filter works.
          return eachVehicle;
        }
      });
    }
    this.spinner.hide();
  }

  searchByName(): void {
    this.vehicleSelector = "all"; //searching all vehicles by the name.
    if (this.enteredName.length == 0) {
      this.filteredList = this.vehicleList;
    } else {
      this.filteredList = this.vehicleList.filter((eachVehicle) => {
        return eachVehicle.vehicleName.toLowerCase().trim().includes(this.enteredName.toLowerCase().trim());
      })
    }
  }

  processDeleteClicked(theVehicle: Vehicle) {
    //method executed as a callback to the event raised by admin clicking delete on vehicle card
    this.modalRef = this.modalService.show(RemoveVehiclePromptComponent, {
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
      initialState: {
        vehicleBeingRemoved: theVehicle
      }
    })

    this.removeSub = this.modalRef.content.removed.subscribe((data) => {
      //when removed successfully, refresh the vehicles and the types.
      this.getAllVehicleTypes();
      this.getAllVehicles();
    })
  }

  processEditClicked(theVehicleToBeEdited: Vehicle) {
    //launch the edit vehicle modal
    this.modalRef = this.modalService.show(VehicleCreateUpdateComponent,
      //configure initial state
      {
        animated: true,
        ignoreBackdropClick: true,
        keyboard: false,
        initialState: {
          vehicleBeingEdited: theVehicleToBeEdited
        },
        class: 'modal-lg modal-dialog-centered'
      }
    )

    this.editedSub = this.modalRef.content.isSuccess.subscribe((data) => {
      //when removed successfully, refresh the vehicles and the types.
      this.getAllVehicleTypes();
      this.getAllVehicles();
    })
  }

  ngOnDestroy() {
    //if subscription is active, unsubscribe
    if (this.successSubscription) {
      this.successSubscription.unsubscribe();
    }

    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }

    if (this.editedSub) {
      this.editedSub.unsubscribe();
    }
  }
}
