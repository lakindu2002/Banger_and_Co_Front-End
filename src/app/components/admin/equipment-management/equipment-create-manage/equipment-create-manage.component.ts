import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdditionalEquipment } from 'src/app/models/equipment.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment-create-manage',
  templateUrl: './equipment-create-manage.component.html',
  styleUrls: ['./equipment-create-manage.component.css']
})
export class EquipmentCreateManageComponent implements OnInit {

  createMode: boolean = true;
  theEquipmentBeingEdited: AdditionalEquipment;

  theForm: FormGroup;

  success: Subject<boolean> = new Subject(); //used to emit a success object

  //give the instance of the currently opened modal
  //passed a component to .show() you can get access to opened modal by injecting BsModalRef.
  constructor(
    private modalRef: BsModalRef,
    private toast: ToastrService,
    private additionalEquipmentService: EquipmentService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    //initialize the form group (form group contains controls)
    this.theForm = new FormGroup({
      //strings used to avoid removal during minification
      'equipmentName': new FormControl(null, [Validators.required, Validators.maxLength(255), Validators.pattern('^[A-Za-z ]{1,}')]),
      //binding is done to ensure that 'this' call is executed properly when angular calls the validator.
      'equipmentQuantity': new FormControl(1, [Validators.required, Validators.maxLength(4), this.isQuantityValid.bind(this)]),
      'pricePerDay': new FormControl(null, Validators.required),
    })

    if (this.createMode == false) {
      //if the user is editing, patch the equipment information to the form.
      this.theForm.patchValue({
        'equipmentName': this.theEquipmentBeingEdited.equipmentName,
        'equipmentQuantity': this.theEquipmentBeingEdited.equipmentQuantity,
        'pricePerDay': this.theEquipmentBeingEdited.pricePerDay
      });
      console.log(parseFloat(this.theEquipmentBeingEdited.pricePerDay))
      this.theForm.controls['pricePerDay'].disable();
    }
  }

  getTitle(): string {
    if (this.createMode) {
      //if creating
      return "Create Additional Equipment";
    } else {
      return "Update Equipment";
    }
  }

  closeModal() {
    this.modalRef.hide();
  }

  isQuantityValid(theControl: FormControl): { [message: string]: boolean } {
    //return a key-value pair of boolean
    //angular returns NULL if the value is valid, this is how angular works (control is valid)
    if ((theControl.value < 1 || theControl.value > 9999) && this.createMode) {
      return { "quantityInvalid": true }; //input is invalid
    } else if ((theControl.value < 0 || theControl.value > 9999) && !this.createMode) {
      return { "quantityInvalid": true }; //if provided quantity during update is a minus value
    }
    return null; //input is valid
  }

  getButtonCaption() {
    if (this.createMode) {
      //if creating
      return "Create Additional Equipment";
    } else {
      return "Update Additional Equipment";
    }
  }

  processEquipmentHandling() {
    if (this.theForm.valid) {
      if (this.createMode) {
        this.createAdditionalEquipment();
      } else {
        this.updateAdditionalEquipment();
      }
    }
  }
  updateAdditionalEquipment() {
    //once user clicks update additional equipment from template, this method gets executed
    this.spinner.show();

    const updatePasser: AdditionalEquipment = {
      equipmentId: this.theEquipmentBeingEdited.equipmentId,
      equipmentName: this.theForm.get('equipmentName').value,
      equipmentQuantity: this.theForm.get('equipmentQuantity').value,
      pricePerDay: this.theForm.get('pricePerDay').value
    };

    this.additionalEquipmentService.updateEquipment(updatePasser).subscribe((data) => {
      this.toast.success(data.message.toString(), "Equipment Information Updated Successfully");
      this.success.next(true); //emit a new value that will be listened by all subscribed to this observable
      this.spinner.hide();
      this.closeModal();
    }, (error: ErrorResponse) => {
      //if error occurs
      if (error.multipleErrors.length > 0) {
        //validation errors.
        for (const eachError of error.multipleErrors) {
          this.toast.warning(eachError.message);
        }
      }
      this.toast.error(error.exceptionMessage, "Equipment Information Not Updated");
      this.spinner.hide();
    })
  }

  createAdditionalEquipment() {
    this.spinner.show(); //show the loading bar

    //construct a DTO to pass to server
    const thePasser: AdditionalEquipment = {
      equipmentName: this.theForm.get('equipmentName').value,
      equipmentQuantity: this.theForm.get('equipmentQuantity').value,
      pricePerDay: this.theForm.get('pricePerDay').value
    };

    //call the service method and subscribe to hit the endpoint.
    this.additionalEquipmentService.createAdditionalEquipment(thePasser).subscribe((response) => {
      //if it is successfully saved
      this.toast.success(response.message.toString(), "Additional Equipment Created Successfully");
      this.success.next(true); //emit a new value that will be listened by all subscribed to this observable
      this.spinner.hide();
      this.closeModal();
    }, (error: ErrorResponse) => {
      //if error occurs
      if (error.multipleErrors.length > 0) {
        //validation errors.
        for (const eachError of error.multipleErrors) {
          this.toast.warning(eachError.message);
        }
      }
      this.toast.error(error.exceptionMessage, "Additional Equipment Not Created");
      this.spinner.hide();
    })

  }

}
