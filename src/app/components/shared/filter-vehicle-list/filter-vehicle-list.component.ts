import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-filter-vehicle-list',
  templateUrl: './filter-vehicle-list.component.html',
  styleUrls: ['./filter-vehicle-list.component.css']
})
export class FilterVehicleListComponent implements OnInit {

  theFilterInformation: VehicleRentalFilter;
  availableVehicles: Vehicle[] = [];
  isError: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private vehicleService: VehicleService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((data: VehicleRentalFilter) => {
      this.theFilterInformation = data;
      this.getFilterListFromDB();
    })
  }

  getFilterListFromDB() {
    this.availableVehicles = [];
    this.isError = false;
    this.spinner.show('filterSpinner');
    this.vehicleService.getRentableVehiclesForFilter(this.theFilterInformation).subscribe((data) => {

      this.availableVehicles = data;
      this.spinner.hide('filterSpinner');
      this.toast.info(`We found ${data.length} available vehicles for your rental period`, "Vehicles Found");

    }, (error: ErrorResponse) => {

      this.isError = true;

      if (error.multipleErrors.length > 0) {
        for (const eachError of error.multipleErrors) {
          this.toast.warning(eachError.message);
        }
      }

      this.toast.error(error.exceptionMessage, "Failed To Find Vehicles")
      this.spinner.hide('filterSpinner');

    })
  }

}
