import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-panel',
  templateUrl: './vehicle-panel.component.html',
  styleUrls: ['./vehicle-panel.component.css']
})
export class VehiclePanelComponent implements OnInit, OnDestroy {

  customerRentClickedSub: Subscription;
  theVehicle: Vehicle;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.customerRentClickedSub = this.vehicleService.customerClickedRent.subscribe((data) => {
      //customer has clicked rent
      this.theVehicle = data;
      console.log(data);
    })
  }


  ngOnDestroy(): void {
    if (this.customerRentClickedSub) {
      this.customerRentClickedSub.unsubscribe();
    }
  }
}
