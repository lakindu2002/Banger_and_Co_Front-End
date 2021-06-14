import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-rental-filter-pop-up',
  templateUrl: './vehicle-rental-filter-pop-up.component.html',
  styleUrls: ['./vehicle-rental-filter-pop-up.component.css']
})
export class VehicleRentalFilterPopUpComponent implements OnInit {

  constructor(
    private modalRef: BsModalRef,
    private vehicleService: VehicleService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  hideModal(): void {
    this.modalRef.hide();
  }

}
