import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-rent-vehicle',
  templateUrl: './rent-vehicle.component.html',
  styleUrls: ['./rent-vehicle.component.css']
})
export class RentVehicleComponent implements OnInit {

  rentalCaption: string = "";
  vehicleId: number;
  rentalFilter: VehicleRentalFilter;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.rentalFilter = this.activatedRoute.snapshot.queryParams as VehicleRentalFilter;
    this.vehicleId = Number.parseInt(this.activatedRoute.snapshot.params['vehicleId']);
    this.rentalCaption = "Rent This Vehicle Now"
    this.getVehicleInformation();
  }

  getVehicleInformation() {
    this.spinner.show();
    this.vehicleService.getVehicleByLicensePlate(this.vehicleId).subscribe((data) => {
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.toastr.error(error.exceptionMessage, "Failed To Retrieve Vehicle");
      this.spinner.hide();
    });
  }
}

