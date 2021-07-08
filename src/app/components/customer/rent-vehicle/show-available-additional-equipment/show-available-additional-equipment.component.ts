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

}
