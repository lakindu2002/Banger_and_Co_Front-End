import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Rental } from 'src/app/models/rental.model';
import { TimeList } from 'src/app/models/supportedTimeList.model';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { ResponseAPI } from 'src/app/models/response.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';

@Component({
  selector: 'app-update-rental-time',
  templateUrl: './update-rental-time.component.html',
  styleUrls: ['./update-rental-time.component.css']
})
export class UpdateRentalTimeComponent implements OnInit {

  rental: Rental;
  isSuccess: Subject<boolean> = new Subject();
  supportedTimeList: string[] = TimeList;
  pickupDay: Date;
  returnDay: Date;

  perDayDivisor: number = 24;
  rentalDurationInHours: number;

  formTime: string = "08:00";

  constructor(
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const pickUpTimeSplit = this.rental.pickupTime.split(":");
    const returnTimeSplit = this.rental.returnTime.split(":");

    this.pickupDay = new Date(this.rental.pickupDate);
    this.pickupDay.setHours(Number.parseInt(pickUpTimeSplit[0]));
    this.pickupDay.setMinutes(Number.parseInt(pickUpTimeSplit[1]));

    this.returnDay = new Date(this.rental.returnDate);
    this.returnDay.setHours(Number.parseInt(returnTimeSplit[0]));
    this.returnDay.setMinutes(Number.parseInt(returnTimeSplit[1]));

    const pickupMoment = moment(this.pickupDay);
    const returnMoment = moment(this.returnDay)

    this.rentalDurationInHours = returnMoment.diff(pickupMoment, "hours");
  }

  hideModal() {
    this.modalRef.hide();
  }

  updateRentalReturnTime() {
    const updatingRental: Rental = {
      rentalId: this.rental.rentalId,
      equipmentsAddedToRental: this.rental.equipmentsAddedToRental,
      pickupDate: this.rental.pickupDate,
      pickupTime: this.rental.pickupTime,
      returnDate: this.rental.returnDate,
      returnTime: this.formTime,
      totalCostForRental: this.rental.totalCostForRental,
      vehicleToBeRented: this.rental.vehicleToBeRented.vehicleId,
      customerUsername: this.localStorageService.getUserInLocalStorage().username
    };

    this.rentalService.updateRentalTime(updatingRental).subscribe((data: ResponseAPI) => {
      this.isSuccess.next(true);
      this.spinner.hide();
      this.toast.success(data.message, "Rental Return Time Updated Successfully");
      this.hideModal();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Failed to Update Rental Return Time");
      this.spinner.hide();
    })
  }

  handleNewTimeSelected() {
    const returnTimeSplit = this.formTime.split(":");

    this.returnDay = new Date(this.rental.returnDate);
    this.returnDay.setHours(Number.parseInt(returnTimeSplit[0]));
    this.returnDay.setMinutes(Number.parseInt(returnTimeSplit[1]));

    const pickupMoment = moment(this.pickupDay);
    const returnMoment = moment(this.returnDay)

    this.rentalDurationInHours = returnMoment.diff(pickupMoment, "hours");

    this.calculateRentalCost()
  }

  calculateRentalCost() {
    const vehicleCost = this.calculateVehicleCost();
    const equipmentCost = this.calculateEquipmentCost();

    this.rental.totalCostForRental = vehicleCost + equipmentCost;
  }

  calculateEquipmentCost(): number {
    let totalCost = 0;
    this.rental.equipmentsAddedToRental.forEach((equipmentInRental) => {
      //remove the LKR returned from backend.
      const actualPrice = Number.parseFloat(equipmentInRental.pricePerDay.substring("LKR - ".length))
      totalCost = totalCost + (((actualPrice / this.perDayDivisor) * this.rentalDurationInHours) * equipmentInRental.quantitySelectedForRental);
    })
    return totalCost;
  }

  calculateVehicleCost(): number {
    const actualPrice: number = Number.parseFloat(this.rental.vehicleToBeRented.vehicleType.pricePerDay.substring("LKR - ".length))
    return ((actualPrice / this.perDayDivisor) * this.rentalDurationInHours);
  }

}
