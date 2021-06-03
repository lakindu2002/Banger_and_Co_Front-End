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

  constructor(
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private vehicleTypeService: VehicleTypeService
  ) { }

  ngOnInit(): void {
    this.vehicleTypeCreator = new FormGroup({
      "typeName": new FormControl(null, [Validators.maxLength(50), Validators.required]),
      "categorySize": new FormControl("small", Validators.required),
      "pricePerDay": new FormControl(null, Validators.required),
    });
  }

  handleNewTypeCreation(): void {
    this.spinner.show();

    const passer: VehicleType = {
      pricePerDay: this.vehicleTypeCreator.get('pricePerDay').value,
      size: this.vehicleTypeCreator.get('categorySize').value,
      typeName: this.vehicleTypeCreator.get('typeName').value
    }

    this.vehicleTypeService.createVehicleType(passer).subscribe((data) => {
      this.toast.success("Vehicle type was created successfully. Select it from the dropdown.", "Vehicle Type Created")

      //emit a new value from the subject for the success
      this.isSuccess.next(true);
      //hide this modal
      this.modalRef.hide();

      this.spinner.hide();
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
      return "Create a Vehicle Type";
    } else {
      return "Edit a Vehicle Type";
    }
  }

  getButtonName():string{
    if(this.createMode){
      return "Create Vehicle Type";
    }else{
      return "Update Vehicle Type";
    }
  }
}
