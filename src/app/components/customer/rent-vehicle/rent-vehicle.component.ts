import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehicleRentalFilterPopUpComponent } from '../../shared/vehicle-rental-filter-pop-up/vehicle-rental-filter-pop-up.component';

@Component({
  selector: 'app-rent-vehicle',
  templateUrl: './rent-vehicle.component.html',
  styleUrls: ['./rent-vehicle.component.css']
})
export class RentVehicleComponent implements OnInit {

  rentalCaption: string = "";
  vehicleId: number;
  rentalFilter: VehicleRentalFilter;
  isError: boolean = false;

  vehicleToBeRented: Vehicle;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.rentalFilter = this.activatedRoute.snapshot.queryParams as VehicleRentalFilter;
    this.vehicleId = Number.parseInt(this.activatedRoute.snapshot.params['vehicleId']);
    this.rentalCaption = "Rent This Vehicle Now"
    this.getVehicleInformation();
  }

  getVehicleInformation() {
    this.isError = false;
    this.spinner.show();
    this.vehicleService.getVehicleByLicensePlate(this.vehicleId).subscribe((data) => {
      this.vehicleToBeRented = data;
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.toastr.error(error.exceptionMessage, "Failed To Retrieve Vehicle");
      this.isError = true;
      this.spinner.hide();
    });
  }

  editDates() {
    this.modalService.show(VehicleRentalFilterPopUpComponent,{
      backdrop:true,
      ignoreBackdropClick:true,
      keyboard:false,
      class:'modal-dialog-centered modal-lg'
    })
  }
}

