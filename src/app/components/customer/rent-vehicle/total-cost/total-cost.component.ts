import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';

@Component({
  selector: 'app-total-cost',
  templateUrl: './total-cost.component.html',
  styleUrls: ['./total-cost.component.css']
})
export class TotalCostComponent implements OnInit {

  @Input("rentingVehicle") vehicleToBeRented: Vehicle;
  @Input("rentalDuration") rentalDuration: VehicleRentalFilter;

  constructor() { }

  ngOnInit(): void {
  }

  proceedRental() {

  }

}
