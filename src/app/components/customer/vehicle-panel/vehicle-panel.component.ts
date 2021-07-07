import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-panel',
  templateUrl: './vehicle-panel.component.html',
  styleUrls: ['./vehicle-panel.component.css']
})
export class VehiclePanelComponent implements OnInit, OnDestroy {

  customerRentClickedSub: Subscription;
  theVehicle: Vehicle;
  rentalFilter: VehicleRentalFilter

  constructor(private vehicleService: VehicleService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.rentalFilter = params as VehicleRentalFilter;
    })
    this.customerRentClickedSub = this.vehicleService.customerClickedRent.subscribe((data) => {
      //customer has clicked rent
      this.theVehicle = data;
      this.router.navigate(['customer', 'home', 'rent', this.theVehicle.vehicleId], {
        queryParams: this.rentalFilter
      })
    })
  }


  ngOnDestroy(): void {
    if (this.customerRentClickedSub) {
      this.customerRentClickedSub.unsubscribe();
    }
  }
}
