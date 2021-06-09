import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent implements OnInit {

  @Input('vehicleToRender') theVehicle: Vehicle; //the vehicle that will be passed into the component from a parent component.

  constructor() { }

  ngOnInit(): void {
  }

}
