import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-rental-filter-pop-up',
  templateUrl: './vehicle-rental-filter-pop-up.component.html',
  styleUrls: ['./vehicle-rental-filter-pop-up.component.css']
})
export class VehicleRentalFilterPopUpComponent implements OnInit {

  pickupMinDate: Date; //used in Return date selection
  selectedPickupDate: Date; //used to set the minimum return date
  maxDate: Date; //used to denote the max date for rental duration
  showReturnMessage: boolean = false;

  pickupStartMin: Date;
  returnTimeMax: Date;

  rentalFilterForm: FormGroup;

  constructor(
    private modalRef: BsModalRef,
    private vehicleService: VehicleService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.pickupMinDate = new Date();
    this.selectedPickupDate = this.pickupMinDate;
    this.maxDate = new Date(this.selectedPickupDate.getTime() + (14 * 24 * 60 * 60 * 1000)); //set the max return date 14 days after selected pickup


    this.rentalFilterForm = new FormGroup({
      'pickupDate': new FormControl(this.selectedPickupDate, [Validators.required]),
      'returnDate': new FormControl(this.selectedPickupDate, [Validators.required]),
      'pickupTime': new FormControl(null, [Validators.required, this.timePickerValidator.bind(this)]),
      'returnTime': new FormControl(null, [Validators.required, this.timePickerValidator.bind(this)])
    }, {
      validators: this.returnTimeValidaton().bind(this),
      updateOn: 'change'
    })
  }

  hideModal(): void {
    this.modalRef.hide();
  }

  dateChanged() {
    //when the pickup date changes execute method
    this.showReturnMessage = true;
    const pickupDate: Date = this.rentalFilterForm.get('pickupDate').value;
    this.selectedPickupDate = pickupDate; //set the return date min as the selected pickup date
    this.maxDate = new Date(pickupDate.getTime() + (14 * 24 * 60 * 60 * 1000)); //set the max return date 14 days after selected pickup
  }

  returnTimeValidaton(): ValidatorFn {
    return (rentalForm: FormGroup) => {
      //return a ValidationFn
      if (rentalForm.get('pickupTime').value != null && rentalForm.get('returnTime').value != null) {
        const pickUpTimeSelected = rentalForm.get('pickupTime').value.split(":");
        const returnTimeSelected = rentalForm.get('returnTime').value.split(":");

        const pickupTime = new Date();
        pickupTime.setHours(pickUpTimeSelected[0]);
        pickupTime.setMinutes(pickUpTimeSelected[1]);
        pickupTime.setSeconds(0);

        const returnTime = new Date();
        returnTime.setHours(returnTimeSelected[0]);
        returnTime.setMinutes(returnTimeSelected[1]);
        returnTime.setSeconds(0);

        const pickUpDate = (rentalForm.get('pickupDate').value as Date).getDate();
        const returnDate = (rentalForm.get('returnDate').value as Date).getDate();

        if (returnTime.getTime() < pickupTime.getTime()) {
          //return error object is return time is earlier than pickup time
          return { timeInvalid: true };
        }

        if (pickUpDate == returnDate) {
          //same day rental, therefore minimum rental duration is 5 hours
          const rentalDuration = returnTime.getTime() - pickupTime.getTime();
          if (rentalDuration < (18000000)) {
            //if rental duration is less than 5 hours
            return { hourNotMet: true };
          }
        }

        return null;
      } else {
        return { timeInvalid: true }
      }
    }
  }

  timePickerValidator(control: FormControl) {
    //validator method used to check if the entered return and pickup times are between 8:00 and 18:00
    if (control.value != null) {
      //split is done because control returns a string with sample output - "8:00"
      //split by : to get the hours and minutes
      const splitTime = (control.value as string).split(":");
      const newDate = new Date();
      newDate.setHours(Number.parseInt(splitTime[0]));
      newDate.setMinutes(Number.parseInt(splitTime[1]));
      newDate.setSeconds(0);

      const selectedTime = newDate;

      if (selectedTime.getHours() < 8 && (selectedTime.getMinutes() > 0 || selectedTime.getMinutes() >= 0)) {
        //if the selected pickup or return time is before 8
        //if minutes is 0 or more than 0
        //done to block times like "6:00" and "6:"
        return { timeInvalid: true };
      }


      if (selectedTime.getHours() > 18 && selectedTime.getMinutes() >= 0) {
        //if the selected pickup or return time is after 6
        return { timeInvalid: true };
      }

      if (selectedTime.getHours() >= 18 && selectedTime.getMinutes() > 0) {
        //if hour is 6 or more and minute is greater than 0
        //if the selected pickup or return time is after 6
        return { timeInvalid: true };
      }

      return null; //if validated successfully.
    } else {
      return { timeInvalid: true };
    }
  }

  findVehiclesAvailableForDurationInDb() {
    this.spinner.show();

    const filter: VehicleRentalFilter = {
      pickupDate: this.rentalFilterForm.get('pickupDate').value as Date,
      returnDate: this.rentalFilterForm.get('returnDate').value as Date,
      pickupTime: this.rentalFilterForm.get('pickupTime').value,
      returnTime: this.rentalFilterForm.get('returnTime').value
    }
    this.vehicleService.getRentableVehiclesForFilter(filter).subscribe((data) => {
      this.toast.info(`We found ${data.length} vehicles for your rental duration`, "Vehicles Retrieved");
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      if (error.multipleErrors.length > 0) {
        for (const eachError of error.multipleErrors) {
          this.toast.error(eachError.message);
        }
      }
      this.toast.error(error.exceptionMessage, "Failed to Find Available Vehicles")
      this.spinner.hide();
    })
  }
}
