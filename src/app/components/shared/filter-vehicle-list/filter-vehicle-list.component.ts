import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';

@Component({
  selector: 'app-filter-vehicle-list',
  templateUrl: './filter-vehicle-list.component.html',
  styleUrls: ['./filter-vehicle-list.component.css']
})
export class FilterVehicleListComponent implements OnInit {

  theFilterInformation: VehicleRentalFilter;

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((data: VehicleRentalFilter) => {
      this.theFilterInformation = data;
    })
  }

}
