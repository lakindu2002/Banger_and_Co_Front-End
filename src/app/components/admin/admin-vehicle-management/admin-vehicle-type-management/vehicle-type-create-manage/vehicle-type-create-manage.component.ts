import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';

@Component({
  selector: 'app-vehicle-type-create-manage',
  templateUrl: './vehicle-type-create-manage.component.html',
  styleUrls: ['./vehicle-type-create-manage.component.css']
})
export class VehicleTypeCreateManageComponent implements OnInit {

  vehicleTypeCreator: FormGroup;
  isSuccess: Subject<boolean> = new Subject();
  createMode: boolean = true; //initially set to true
  typeUpdated: VehicleType;

  constructor(
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private vehicleTypeService: VehicleTypeService
  ) { }

  ngOnInit(): void {
    if (this.createMode == false) {
      //remove the currency sign from the price per day
      const totalLength: number = this.typeUpdated.pricePerDay.length;
      const positionAfterCurrency: number = (this.typeUpdated.pricePerDay.length) - (this.typeUpdated.pricePerDay.length - 1);
      //retrieves position after pound sign to the end.

      //being edited
      this.vehicleTypeCreator = new FormGroup({
        "typeName": new FormControl(this.typeUpdated.typeName, [Validators.maxLength(50), Validators.required]),
        "categorySize": new FormControl(this.typeUpdated.size.toLowerCase(), Validators.required),
        "pricePerDay": new FormControl(this.typeUpdated.pricePerDay.substring(
          positionAfterCurrency, totalLength
        ), Validators.required),
      });

      this.vehicleTypeCreator.controls['typeName'].disable();
      this.vehicleTypeCreator.controls['categorySize'].disable();

    } else {
      //new type being created
      this.vehicleTypeCreator = new FormGroup({
        "typeName": new FormControl(null, [Validators.maxLength(50), Validators.required]),
        "categorySize": new FormControl("small", Validators.required),
        "pricePerDay": new FormControl(null, Validators.required),
      });
    }
  }

  handleType(): void {
    if (this.createMode) {
      //if creating a new object
      this.createNewTypeInDb();
    } else {
      //update the type
      this.updateTypeInDB();
    }
  }

  updateTypeInDB() {
    this.spinner.show();

    const updateObj: VehicleType = {
      vehicleTypeId: this.typeUpdated.vehicleTypeId,
      pricePerDay: this.vehicleTypeCreator.get('pricePerDay').value,
      size: this.vehicleTypeCreator.get('categorySize').value,
      typeName: this.vehicleTypeCreator.get('typeName').value
    }

    this.vehicleTypeService.updateVehicleType(updateObj).subscribe((data) => {
      this.isSuccess.next(true);
      this.toast.success(data.message, "Vehicle Type Information Updated");
      this.spinner.hide();
      this.hideModal();
    }, (error: ErrorResponse) => {
      if (error.multipleErrors.length > 0) {
        for (const eachError of error.multipleErrors) {
          this.toast.warning(eachError.message);
        }
      }
      this.toast.error(error.exceptionMessage,"Vehicle Type Information Not Updated");
      this.spinner.hide();
    })
  }

  createNewTypeInDb() {
    this.spinner.show();

    const passer: VehicleType = {
      pricePerDay: this.vehicleTypeCreator.get('pricePerDay').value,
      size: this.vehicleTypeCreator.get('categorySize').value,
      typeName: this.vehicleTypeCreator.get('typeName').value
    }

    this.vehicleTypeService.createVehicleType(passer).subscribe((data) => {
      //emit a new value from the subject for the success
      this.isSuccess.next(true);
      this.toast.success("Vehicle type was created successfully. You can now assign this type to vehicles when creating new vehicles.", "Vehicle Type Created")
      this.spinner.hide();
      //hide this modal
      this.modalRef.hide();
    }, (error: ErrorResponse) => {
      if (error.multipleErrors.length > 0) {
        for (const eachError of error.multipleErrors) {
          this.toast.warning(eachError.message); //error returns name of attribute
        }
      }
      this.toast.error(error.exceptionMessage, "Vehicle Type Not Created")
      this.spinner.hide();
    })
  }

  hideModal() {
    this.modalRef.hide();
  }

  getName(): string {
    if (this.createMode) {
      //if initial state of modal is on create mode (creating a new vehicle type.)
      return "Create a Vehicle Type";
    } else {
      return "Edit a Vehicle Type";
    }
  }

  getButtonName(): string {
    if (this.createMode) {
      return "Create Vehicle Type";
    } else {
      return "Update Vehicle Type";
    }
  }
}
