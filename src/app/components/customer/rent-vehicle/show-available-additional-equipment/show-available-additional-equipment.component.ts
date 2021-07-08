import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdditionalEquipment } from 'src/app/models/equipment.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-show-available-additional-equipment',
  templateUrl: './show-available-additional-equipment.component.html',
  styleUrls: ['./show-available-additional-equipment.component.css']
})
export class ShowAvailableAdditionalEquipmentComponent implements OnInit {

  isError: boolean = false;
  loadedEquipments: AdditionalEquipment[] = [];
  errorMessage: string = "";

  constructor(
    private equipmentService: EquipmentService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show('equipmentSpinner');
    this.errorMessage = "";
    this.isError = false;

    this.equipmentService.getAvailableEquipments().subscribe((data) => {
      this.loadedEquipments = data;
      this.setInitialStateOfQuantityAs0();
      this.spinner.hide('equipmentSpinner');
    }, (error: ErrorResponse) => {
      if (error.exceptionMessage) {
        this.errorMessage = error.exceptionMessage;
      } else {
        this.errorMessage = "An error occured while obtaining rental add ons. Please try again.";
      }
      this.loadedEquipments = undefined;
      this.isError = true;
      this.spinner.hide('equipmentSpinner');
    });
  }

  setInitialStateOfQuantityAs0() {
    this.loadedEquipments = this.loadedEquipments.map((eachEquipment) => {
      if (!eachEquipment.quantitySelectedForRental) {
        //initially, if the equipment has no selected quantity, set as 0
        eachEquipment.quantitySelectedForRental = 0;
      }
      return eachEquipment;
    })
  }

  reduce(equipmentReduced: AdditionalEquipment) {
    const reducedQuantity = equipmentReduced.quantitySelectedForRental - 1;
    if (reducedQuantity <= 0) {
      //if user is in the - or 0 range, set as 0
      equipmentReduced.quantitySelectedForRental = 0;
    } else {
      equipmentReduced.quantitySelectedForRental = reducedQuantity;
    }
  }

  add(equipmentAdded: AdditionalEquipment) {
    const increasedQuantity = equipmentAdded.quantitySelectedForRental + 1;
    if (equipmentAdded.equipmentQuantity < 3) {
      //if in DB less than 3
      if (increasedQuantity === equipmentAdded.equipmentQuantity) {
        //check if user requesting is same is total in stock
        equipmentAdded.quantitySelectedForRental = increasedQuantity;
      } else {
        equipmentAdded.quantitySelectedForRental = increasedQuantity;
      }
    } else {
      //if more than 3 are available in DB
      if (increasedQuantity >= 3) {
        //if user selects more than 3, set max as 3
        equipmentAdded.quantitySelectedForRental = 3;
      } else {
        equipmentAdded.quantitySelectedForRental = increasedQuantity;
      }
    }
  }

  getMessage(equipment: AdditionalEquipment) {
    if (equipment.equipmentQuantity < 3) {
      return `Maximum of ${equipment.equipmentQuantity} Can Be Added To Rental`
    } else {
      return "Maximum of 3 Can Be Added To Rental";
    }
  }
}

