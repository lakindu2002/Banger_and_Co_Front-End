import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';
import * as moment from 'moment';
import { EquipmentCalculatorService } from '../equipment-cost-calculator.service';
import { AdditionalEquipment } from 'src/app/models/equipment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-total-cost',
  templateUrl: './total-cost.component.html',
  styleUrls: ['./total-cost.component.css']
})
export class TotalCostComponent implements OnInit, OnDestroy {

  @Input("rentingVehicle") vehicleToBeRented: Vehicle;
  @Input("rentalDuration") rentalDuration: VehicleRentalFilter;

  pickupDateTime: Date;
  returnDateTime: Date;

  rentalDurationInHours: number = 0;
  sameDayRental: boolean = false;

  rentalDurationInDays: number = 0; //used to show rental days
  costOfVehicle: string;
  totalCostForRental: number = 0;

  perDayDivisor: number = 24;

  // [{ equipment: AdditionalEquipment, quantity: number }]
  listOfEquipmentsAdded: any = [];
  addingSub: Subscription;
  removingSub: Subscription;

  constructor(private equipmentCalculator: EquipmentCalculatorService) { }

  ngOnInit(): void {
    this.constructDateTimes();
    this.calculateDifferences();
    this.calculateVehicleCost();

    this.equipmentCalculator.equipmentAdded.subscribe((addedEquipment) => {
      this.addEquipmentToRental(addedEquipment);
      this.calculateTotalCostOfEquipment();
    });

    this.equipmentCalculator.equipmentRemoved.subscribe((removedEquipment) => {
      this.removeEquipmentFromRental(removedEquipment);
      this.calculateTotalCostOfEquipment();
    });
  }

  removeEquipmentFromRental(removedEquipment: AdditionalEquipment) {
    //find the equipment in the array and reduce its quantity, if quantity is 0, completely remove it from array
    let looper = 0;
    let locatedIndex: number = -1;
    for (looper = 0; looper < this.listOfEquipmentsAdded.length; looper++) {
      const item = this.listOfEquipmentsAdded[looper];
      if (item.equipment.equipmentId === removedEquipment.equipmentId) {
        //position of removing equipment in the array
        locatedIndex = looper;
        break;
      }
    }


    const objectAtIndex = this.listOfEquipmentsAdded[locatedIndex];
    objectAtIndex.quantity = objectAtIndex.quantity - 1;
    if (objectAtIndex.quantity <= 0) {
      //completely remove the object as it is not added in rental (quantity == or < 0)
      this.listOfEquipmentsAdded.splice(locatedIndex, 1); //remove the object
    } else {
      //still quantity is present for rental
      this.listOfEquipmentsAdded[locatedIndex] = objectAtIndex;
    }

  }

  addEquipmentToRental(addedEquipment: AdditionalEquipment) {
    if (this.listOfEquipmentsAdded.length > 0) {
      //if array already has equipment, locate to see if user has already added it
      let looper = 0;
      let isExist: boolean = false;
      let locatedIndex: number = -1;
      for (looper = 0; looper < this.listOfEquipmentsAdded.length; looper++) {
        const item = this.listOfEquipmentsAdded[looper];
        if (item.equipment.equipmentId === addedEquipment.equipmentId) {
          //item already added, therefore increase quantity and carry on
          isExist = true;
          locatedIndex = looper;
          break;
        } else {
          isExist = false;
        }
      }

      if (isExist) {
        //item already added to rental, increase quantity by one and update that existing index
        const objectAtIndex = this.listOfEquipmentsAdded[locatedIndex];
        objectAtIndex.quantity = objectAtIndex.quantity + 1;
        this.listOfEquipmentsAdded[locatedIndex] = objectAtIndex;
      } else {
        //new item, so push new item.
        this.listOfEquipmentsAdded.push({ equipment: addedEquipment, quantity: 1 })
      }

    } else {
      this.listOfEquipmentsAdded.push({ equipment: addedEquipment, quantity: 1 })
    }
  }

  calculateTotalCostOfEquipment(){

  }

  constructDateTimes() {
    const pickUpTimeSplit = this.rentalDuration.pickupTime.split(":");
    const returnTimeSplit = this.rentalDuration.returnTime.split(":");

    this.pickupDateTime = new Date(this.rentalDuration.pickupDate);
    this.pickupDateTime.setHours(Number.parseInt(pickUpTimeSplit[0]));
    this.pickupDateTime.setMinutes(Number.parseInt(pickUpTimeSplit[1]));

    this.returnDateTime = new Date(this.rentalDuration.returnDate);
    this.returnDateTime.setHours(Number.parseInt(returnTimeSplit[0]));
    this.returnDateTime.setMinutes(Number.parseInt(returnTimeSplit[1]));
  }

  calculateVehicleCost() {
    //priceperday/24 = per hour cost
    const actualPrice = Number.parseFloat(this.vehicleToBeRented.vehicleType.pricePerDay.substring("LKR - ".length))
    this.costOfVehicle = ((actualPrice / this.perDayDivisor) * this.rentalDurationInHours).toFixed(2);
  }

  calculateDifferences() {
    this.sameDayRental = false;

    const pickupMoment = moment(this.pickupDateTime);
    const returnMoment = moment(this.returnDateTime)

    if (returnMoment.diff(pickupMoment, "days") === 0) {
      //same day rental
      this.sameDayRental = true;
    } else {
      this.sameDayRental = false;
      this.rentalDurationInDays = returnMoment.diff(pickupMoment, "days");
    }
    //get duration in hours
    this.rentalDurationInHours = returnMoment.diff(pickupMoment, "hours");
  }

  proceedRental() {

  }

  getHeader() {
    if (this.sameDayRental) {
      return `Cost of Rental for ${this.rentalDurationInHours} Hours`;
    } else {
      return `Cost of Rental for ${this.rentalDurationInDays} Days`;
    }
  }

  getVehicleCost() {
    return `LKR - ${this.costOfVehicle}`
  }

  ngOnDestroy(): void {
    this.addingSub.unsubscribe();
    this.removingSub.unsubscribe();
  }

}
