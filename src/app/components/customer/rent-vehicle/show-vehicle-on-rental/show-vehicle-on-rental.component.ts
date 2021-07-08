import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-show-vehicle-on-rental',
  templateUrl: './show-vehicle-on-rental.component.html',
  styleUrls: ['./show-vehicle-on-rental.component.css']
})
export class ShowVehicleOnRentalComponent implements OnInit {

  @Input("loadedVehicle") vehicleToBeRented: Vehicle;

  constructor() { }

  ngOnInit(): void {
    console.log(this.vehicleToBeRented)
  }

}
