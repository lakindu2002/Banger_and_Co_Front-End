import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthReturn } from 'src/app/models/auth.return.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { User } from 'src/app/models/user.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';
import { VehicleRentalFilterPopUpComponent } from '../vehicle-rental-filter-pop-up/vehicle-rental-filter-pop-up.component';

@Component({
  selector: 'app-filter-vehicle-list',
  templateUrl: './filter-vehicle-list.component.html',
  styleUrls: ['./filter-vehicle-list.component.css']
})
export class FilterVehicleListComponent implements OnInit {

  theFilterInformation: VehicleRentalFilter;
  allVehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  isError: boolean = false;
  loggedInUser: AuthReturn;
  userAge: number = 0;

  modalRef: BsModalRef;

  allTransmission: any = [
    { name: "Manual", isChecked: false },
    { name: "Automatic", isChecked: false },
    { name: "Triptonic", isChecked: false },
  ]

  allFuelTypes: any = [
    { name: "Petrol", isChecked: false },
    { name: "Diesel", isChecked: false },
    { name: "Hybrid", isChecked: false },
    { name: "Electric", isChecked: false },
  ]

  allTypes: VehicleType[] = [];

  selectedTransmissionList: string[] = [];
  selectedFuelList: string[] = [];
  selectedType: string = "all"

  constructor(
    private activateRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private vehicleService: VehicleService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private vehicleTypeService: VehicleTypeService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.localStorageService.getUserInLocalStorage();
    if (this.loggedInUser) {
      this.calculateAge();
    }
    this.activateRoute.queryParams.subscribe((data: VehicleRentalFilter) => {
      this.theFilterInformation = data;
      this.getFilterListFromDB();
      this.getAllVehicleTypes();
    })
  }

  calculateAge() {
    this.userAge = Math.abs(new Date(Date.now() - new Date(this.loggedInUser.dateOfBirth).getTime()).getFullYear() - 1970);
  }

  getFilterListFromDB() {
    this.isError = false;
    this.spinner.show('filterSpinner');
    this.vehicleService.getRentableVehiclesForFilter(this.theFilterInformation).subscribe((data) => {
      this.allVehicles = data;
      this.filteredVehicles = this.allVehicles;
      this.spinner.hide('filterSpinner');
      this.toast.info(`We found ${data.length} available vehicles for your rental period`, "Vehicles Found");

    }, (error: ErrorResponse) => {

      this.isError = true;

      if (error.multipleErrors.length > 0) {
        for (const eachError of error.multipleErrors) {
          this.toast.warning(eachError.message);
        }
      }

      this.toast.error(error.exceptionMessage, "Failed To Find Vehicles")
      this.spinner.hide('filterSpinner');

    })
  }

  getAllVehicleTypes() {
    this.vehicleTypeService.getAllVehicleTypes().subscribe((data) => {
      this.allTypes = data;
    })
  }

  reOpenFilterDates() {
    this.modalRef = this.modalService.show(VehicleRentalFilterPopUpComponent, {
      animated: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered modal-lg',
      keyboard: false
    });
  }

  transmissionChanged(selectedTransmission: string) {
    let isExisting: boolean = false;
    let existingIndex: number = 0;

    this.selectedTransmissionList.forEach((eachType, index) => {
      //check if the selected checkbox value already exists.
      if (eachType.toLowerCase() === selectedTransmission.toLowerCase()) {
        existingIndex = index;
        isExisting = true;
      }
    })
    if (isExisting) {
      //remove the transmission from the array if the user unchecks the checkbox.
      this.selectedTransmissionList.splice(existingIndex, 1);
    } else {
      //not existing,
      this.selectedTransmissionList.push(selectedTransmission);
    }
    this.search(); //search the vehicles by calling search method.
  }

  fuelChanged(selectedFuel: string) {
    let isExisting: boolean = false;
    let existingIndex: number = 0;

    this.selectedFuelList.forEach((eachFuel, index) => {
      //check if the selected checkbox value already exists in the array, if so needs to be removed.
      if (eachFuel.toLowerCase() === selectedFuel.toLowerCase()) {
        existingIndex = index;
        isExisting = true;
      }
    })
    if (isExisting) {
      //remove the fuel type from the array if the user unchecks the checkbox.
      this.selectedFuelList.splice(existingIndex, 1);
    } else {
      //not existing, insert new fuel type
      this.selectedFuelList.push(selectedFuel);
    }
    this.search(); //search the vehicles by calling search method.
  }

  clearAll() {
    //uncheck the checkboxes in the UI
    this.allFuelTypes.forEach((eachType) => {
      eachType.isChecked = false;
    })
    this.allTransmission.forEach((eachTransmission) => {
      eachTransmission.isChecked = false;
    })
    this.selectedType = "all";
    this.selectedFuelList = [];
    this.selectedTransmissionList = [];
    this.filteredVehicles = this.allVehicles;
  }

  search() {
    this.spinner.show('filterSpinner');
    this.filteredVehicles = [];
    //using foreach as filter didnt work
    this.allVehicles.forEach((eachVehicle) => {
      if (this.selectedType == 'all') {
        //user is selecting from all types
        this.validateVehicleInFilterAndInsertToFilterList(eachVehicle)
      } else {
        //filtering for other selected vehicle types (not all vehicles).
        if (eachVehicle.vehicleType.vehicleTypeId === Number.parseInt(this.selectedType)) {
          //filter only vehicles belonging to selected type.
          this.validateVehicleInFilterAndInsertToFilterList(eachVehicle)
        }
      }
    });
    this.spinner.hide('filterSpinner');
  }

  validateVehicleInFilterAndInsertToFilterList(eachVehicle: Vehicle) {
    if (this.selectedFuelList.length > 0 && this.selectedTransmissionList.length == 0) {
      //user has selected some fuels, but not transmission
      this.selectedFuelList.forEach((eachFuel) => {
        //check if the selected fuel is the fuel in vehicle, if so add to the the UI array
        if (eachFuel.toLowerCase() == eachVehicle.fuelType.toLowerCase()) {
          this.filteredVehicles.push(eachVehicle);
        }
      })
    } else if (this.selectedTransmissionList.length > 0 && this.selectedFuelList.length == 0) {
      //user has selected some transmissions, but not fuels
      this.selectedTransmissionList.forEach((eachTransmission) => {
        //check if selected transmision is the vehicle transmission
        if (eachTransmission.toLowerCase() == eachVehicle.transmission.toLowerCase()) {
          this.filteredVehicles.push(eachVehicle);
        }
      })
    } else if (this.selectedFuelList.length > 0 && this.selectedTransmissionList.length > 0) {
      //user has selected both fuels and transmissions
      let fuelApprove: boolean = false;
      let transmissionApprove: boolean = false;

      this.selectedFuelList.forEach((eachFuel) => {
        //check if the vehicle fuel type matches any of the fuel types user selected
        if (eachFuel.toLowerCase() == eachVehicle.fuelType.toLowerCase()) {
          fuelApprove = true;
        }
      })

      this.selectedTransmissionList.forEach((eachTransmission) => {
        //check if the vehicle transmission type matches any of the transmission types user selected
        if (eachTransmission.toLowerCase() == eachVehicle.transmission.toLowerCase()) {
          transmissionApprove = true;
        }
      })

      if (fuelApprove && transmissionApprove) {
        this.filteredVehicles.push(eachVehicle);
      }
    } else {
      //if no fuel type or transmission is selected, but user is viewing all vehicles.
      this.filteredVehicles.push(eachVehicle);
    }
  }
}
